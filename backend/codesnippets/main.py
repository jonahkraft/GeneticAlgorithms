from car import *

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
        plot_generations(self.generation, name="generations", directory=PATH)
        export_generations_to_csv(self.generation, name="generations", directory=PATH)

    def import_from_csv(self, file):
        self.generation = import_generations_from_csv(
            Car,
            name=f"{file}.csv",
            directory=PATH
        )

    def clear(self):
        Car.reset()


# Example:
# x = Schnittstelle()
# x.evolute(generation_count=10, strategy=1)
# x.results()
