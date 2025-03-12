from simulation.car import Car
from simulation.evolution.interfaces.population import Population
from simulation.evolution.operators import EVAL_PARETO, REC_CROSS_POINT
from simulation.evolution.strategies import STRAT_B
from simulation.utilities.helper import export_generations_to_list, import_generations_from_csvfile

# deprecated but maybe useful some other time
# from simulation.utilities.helper import import_generations_from_csv, plot_generations, export_generations_to_csv

'''
Übergebbare Parameter:

generation_count := Anzahl der Generationen die berrechnet werden
strategy := die Strategie, die angewandt wird bei der Generierung neuer Generationen
population_size := konstante Größe der Population
given_seed := seed für die Erzeugung der ersten Population
weights := die Gewichte der Ziehlparameter consumption, elasticity 3-5
elite_count := nur für Strategie 2: Anzahl der Top Individuen, die für die nächste Generation behalten werden
alien_count := nur für Strategie 2: Anzahl der Individuen, die komplett neu generiert werden für die nächste Generation
aep := nur für Strategie 2:  Mutationsrate, eigentlich: je höher, desto geringere Mutation
        deswegen 1-aep in Strategie 2 damit es intuitiver ist, zwischen 0 und 1
i := nur für Strategie 3: aktuelle Generation
n := nur für Strategie 3: komplette Anzahl der Simulationen
'''


class Schnittstelle(object):
    '''
    Erzeugt ein Objekt, welches sich um ein Experiment kümmert, sprich eine Reihe von Generationen
    bis ein gewünschtes Ziel erreicht wurde.
    Danach kann ein neues Objekt erzeugt werden um ein neues Experiment zu starten und beide
    Objekte sollten erhaltbar/nutzbar sein für Vergleiche.
    '''

    def __init__(self, population_size=10, given_seed=42, weights=[-4, -2, -1, -1]):
        '''
        Generiert eine Startpopulation entsprechend eines übergebenen seeds in übergebener Größe,
        welche allerdings nicht kleiner oder gleich der Anzahl der Elite (Standardmäßig 2) + der
        Anzahl der Aliens (Standardmäßig 0) sein darf.
        Definiert auch die Gewichtung der Zielparameter, welche in einer Liste der Länge 4 stehen
        müssen, gefüllt mit Zahlen (sowohl Integer als auch Float sind erlaubt).
        Negative Zahlen minimieren und positive Zahlen maximieren die Ausgabe, da wir den Konsum
        und die Zeit um von 0 auf 100 zu kommen betrachten, wollen wir Standardmäßig minimieren.

        :param population_size: size of the population (constant)
        :type population_size: int

        :param given_seed: seed for the random generation of the first population
        :type given_seed: int

        :param weights: defines how you weight consumption, elasticity 3, elasticity 4 and elasticity 5
        :type weights: list[float]
        '''
        Car._Blueprint['goals'] = weights  # consumption, elasticity 3, elasticity 4, elasticity 5

        self.generation = Population(Car, population_size, seed=given_seed)

    def evolute(self, generation_count=10, strategy=1, aep=0.2, elite_count=2, alien_count=0, i=1, n=10):
        ''''
        Generiert die nächsten [generation_count] Generationen entsprechend der ausgewählten Strategie.
        Dabei gibt es zusätzlich die Optionen aep einzustellen, was unter anderem die Mutationsrate
        beeinflusst.
        Hat für Strategie A und B nur gewisse Relevanz, da dort aep im Laufe der Generationen
        automatisch angepasst wird.

        :param generation_count: how many generations you want to progress
        :type generation_count: int

        :param strategy: which strategy you want to use
        :type strategy: int

        :param aep: mutationrate for strategy 2
        :type aep: float

        :param elite_count: number of elites that stay between generations for strategy 2
        :type elite_count: int

        :param alien_count: number of aliens that get generated comepletely new each generation for strategy 2
        :type alien_count: int

        :param i: the current generation your in for strategy 3
        :type i: int

        :param n: the overall number of generations you want to compute for strategy 3
        :type n: int
        '''
        def STRAT_C(population, _, __):
            '''
            Eine Custom Strategie welche keine Besserung des Ergebnis verspricht, es allerdings
            ermöglicht, die automatische Anpassung des aep im Laufe der Generationen zu umgehen, sowie
            die Einstellungen für weitere Parameter, welche teilweise ungenutzt waren und nützlich
            erschienen.
            '''
            return population.next_generation(
                aep=1-min(max(aep, 0), 1),
                eval_funct=EVAL_PARETO,
                recombination_funct=REC_CROSS_POINT,
                elite=elite_count,
                alien=alien_count
            )

        def STRAT_D(population, _, __):
            '''
            Eine Custom Strategie welche es ermöglichen soll anzugeben in welcher Generation man sich
            befindet und wie viele man haben will und dann aber nur einen Schritt zu machen.
            '''
            return population.next_generation(
                aep=(i + 1) / (n + 1),
                eval_funct=EVAL_PARETO,
                recombination_funct=REC_CROSS_POINT
            )

        if strategy == 3:
            self.generation = self.generation.evolve(1, STRAT_D)
        elif strategy == 2:
            self.generation = self.generation.evolve(generation_count, STRAT_C)
        else:
            self.generation = self.generation.evolve(generation_count, STRAT_B)

    def results(self):
        '''
        Gibt alle Individuen aller Generationen des aktuellen Experiments in einer Liste aus, samt Eingaben
        und Ausgaben der Simulation in folgender Form:
        [[Generation] [Final Drive] [Roll Radius] [Gear 3] [Gear 4] [Gear 5] (Eingaben)
        [Consumption] [Elasticity 3] [Elasticity 4] [Elasticity 5]] (Ausgaben)

        :returns: list of all the values of the generations with a header
        :rtype: list[list[float]] 
        '''
        return export_generations_to_list(self.generation)

    def import_from_csv(self, file):
        '''
        Importiert eine Liste mit Listen als Generation. Alternativ zu einem zufälligen Startzustand.

        :param file: List of Lists in the form: ...
        :type file: list[list[float]]
        '''
        self.generation = import_generations_from_csvfile(
            Car,
            file=file,
        )

    def clear(self):
        '''
        Entfernt alle Instanzen der Klasse und leert den Cache, um zu garantieren, dass unterschiedliche
        Experimente sich untereinander nicht beeinflussen.
        '''
        Car.reset()


# Example
# x = Schnittstelle()
# x.evolute(generation_count=10, strategy=1)
# x.results()
