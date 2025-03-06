from car import *

'''
Übergebbare Parameter:

aep := Mutationrate, desto höher, desto geringer (deswegen 1-aep im Code), zwischen 0 und 1
population size := konstante Größe der Population
seed := seed für die Erzeugung der ersten Population
#generations := Anzahl der Generationen die erzeugt werden
#elite := Anzahl der Top Individuellen die zur nächsten Generation behalten werden
#alien := Anzahl der Individuellen die komplett neu generiert werden für die nächste Generation
'''


class Schnittstelle(object):
    def __init__(self, population_size=10, given_seed=42):
        self.generation = evo.Population(Car, population_size, seed=given_seed)

    def evolute(self, generation_count=10, strategy=1, aep=0.2, elite_count=2, alien_count=0):
        def STRAT_C(population, _, __):
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
        plot_generations(self.generation, name="generations", directory="backend/results/")
        export_generations_to_csv(self.generation, name="generations", directory="backend/results/")

# Example:
# x = Schnittstelle()
# x.evolute(strategy=1, aep=0.2)
