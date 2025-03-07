from codesnippets.car import *

'''
Übergebbare Parameter:

aep := Mutationrate, desto höher, desto geringer (deswegen 1-aep im Code), zwischen 0 und 1
generation_count := Anzahl der Generationen die berrechnet werden
strategy := die Strategie die angewandt wird bei der Generierung neuer Generationen
population_size := konstante Größe der Population
given_seed := seed für die Erzeugung der ersten Population
elite_count := Anzahl der Top Individuellen die zur nächsten Generation behalten werden
alien_count := Anzahl der Individuellen die komplett neu generiert werden für die nächste Generation
'''

PATH = "backend/results/"


class Schnittstelle(object):
    '''
    Erzeugt ein Objekt welches sich um ein Experiment kümmert, sprich eine Reihe von Generationen
    bis ein gewünschtes Ziel erreicht wurde.
    Danach kann ein neues Objekt erzeugt werden um ein neues Experiment zu starten und beide
    Objekte sollten erhaltbar/ nutzbar sein für vergleiche.
    '''

    def __init__(self, population_size=10, given_seed=42):
        '''
        Generiert eine Startpopulation entsprechend eines übergebenen seeds in übergebener Größe,
        welche allerdings nicht kleiner oder gleich der Anzahl der Elite (Standardmäßig 2) + der
        Anzahl der Aliens (Standardmäßig 0) sein darf.
        '''
        self.generation = evo.Population(Car, population_size, seed=given_seed)

    def evolute(self, generation_count=10, strategy=1, aep=0.2, elite_count=2, alien_count=0):
        ''''
        Generiert die nächsten [generation_count] Generationen entsprechend der ausgewählten Strategie.
        Dabei gibt es zusätzlich die Optionen aep einzustellen, was unter anderem die Mutationsrate
        beeinflusst.
        Hat für Strategie A und B nur gewisse Relevanz, da dort aep im Laufe der Generationen
        automatisch angepasst wird.
        '''
        def STRAT_C(population, _, __):
            '''
            Eine Custom Strategie welche keine Besserung des Ergebnis verspricht, allerdings es
            ermöglicht die automatische Anpassung des aep im Laufe der Generationen zu umgehen, sowie
            die Einstellungen für weiterer Parameter welche teilweise ungenutzt waren und nützlich
            erschienen.
            '''
            return population.next_generation(
                aep=1-min(max(aep, 0), 1),
                eval_funct=evo.EVAL_PARETO,
                recombination_funct=evo.REC_CROSS_POINT,
                elite=elite_count,
                alien=alien_count
            )

        if strategy == 2:
            self.generation = self.generation.evolve(generation_count, STRAT_C)
        else:
            self.generation = self.generation.evolve(generation_count, evo.STRAT_B)

    def results(self):
        '''
        Gibt alle Individuen aller Generationen des aktuellen Experiments in einer csv aus samt Eingaben
        und Ausgaben der Simulation in der Form:
        [Generation] [Final Drive] [Roll Radius] [Gear 3] [Gear 4] [Gear 5] (Eingaben)
        [Consumption] [Elasticity 3] [Elasticity 4] [Elasticity 5] (Ausgaben)

        Zusätzlich werden noch 5 png erzeugt um die Entwicklung zu visualisieren.
        3 davon stellen die Population jeweils im Anfangszustand, in der Mitte der Entwicklungsdauer
        und am Ende der Entwicklung dar.
        Die anderen beiden visualisieren den Phenotyp sowie die Qualität.
        '''
        plot_generations(self.generation, name="generations", directory=PATH)
        export_generations_to_csv(self.generation, name="generations", directory=PATH)

    def import_from_csv(self, file):
        '''
        Importiert eine csv als Generation als Alternative zu einem zufälligen Startzustand.
        '''
        self.generation = import_generations_from_csv(
            Car,
            name=f"{file}.csv",
            directory=PATH
        )

    def clear(self):
        '''
        Entfernt alle Instanen der Klasse und lehrt den Cache um zu garantieren dass unterschiedliche
        Experimente sich untereinander nicht beeinflussen.
        '''
        Car.reset()


# Example:
# x = Schnittstelle()
# x.evolute(generation_count=10, strategy=1)
# x.results()
