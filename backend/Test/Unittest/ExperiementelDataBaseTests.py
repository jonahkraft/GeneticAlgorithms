from ast import Try
import sqlite3
from concurrent.futures import ThreadPoolExecutor

import UnitMeta
from backend.Test import MetaTest
import asyncio
from backend import database
import random;

def ToTuple(vals : dict[str, int | float]) -> tuple[int, float, float, float, float, float, float, float, float, float]:
    return (vals["generation"], vals["final_drive"], vals["roll_radius"], vals["gear_3"], vals["gear_4"], vals["gear_5"], vals["consumption"], vals["elasticity_3"], vals["elasticity_4"], vals["elasticity_5"])

def ToDict(vals : list[int | float]) -> dict[str, int | float]:
    MetaTest.MetaTest.typeCheck(MetaTest.MetaTest(), vals, [int, float, float, float, float, float, float, float, float, float])
    return  {
        "generation": vals[0],
        "final_drive": vals[1],
        "roll_radius": vals[2],
        "gear_3" : vals[3],
        "gear_4": vals[4],
        "gear_5": vals[5],
        "consumption": vals[6],
        "elasticity_3": vals[7],
        "elasticity_4": vals[8],
        "elasticity_5": vals[9]
    };
def ToList(vals : dict[str, int | float]) -> list[int | float]:
    return [vals["generation"], vals["final_drive"], vals["roll_radius"], vals["gear_3"], vals["gear_4"], vals["gear_5"], vals["consumption"], vals["elasticity_3"], vals["elasticity_4"], vals["elasticity_5"]]



class ExperiementalDataTests(UnitMeta.UnitMeta):
    def __init__(this, *args, **kwargs):
        this.addedTestData = False
        pass

    def TestExportData(this):
        this.ClearTestDB()
        if not this.addedTestData:
            return "Erst Test Daten hinzufügen!";
        # Äquivalenzklassen: k-Elementige Teilmengen
        testCols : list[list[str]] = []
        # für jede 3
        for k in range(1, 10):
            for _ in range(3):
                testCols.append(random.choices(ALL_COLS, k = k))
        # Jetzt jeder Operator + 2 Cols / Real vergleichen (<, <=, >, >= in einer EQ Klasse)
        ops = ["<", ">", "==", "<>"]
        funcs = [(lambda x, y: x < y), (lambda x, y: x > y), (lambda x, y: x == y), (lambda x, y: not (x == y))]
        leftCols = [random.choice(ALL_COLS) for _ in range(len(ops))]
        rightCols = [random.choice(ALL_COLS) for _ in range(len(ops))]
        reals = [(random.random() - 0.5) * 100 for _ in range(len(ops))] # EQ Klasse: Real
        commands = []
        for i in range(len(ops)):
            commands.append(leftCols[i] + " " + ops[i] + " " + rightCols[i])
            commands.append(leftCols[i] + " " + ops[i] + " " + reals[i])
        for colSelection in testCols:
            for i in range(len(commands)):
                for j in range(len(commands)):
                    (corIndI, corIndJ) = (i // 2, j // 2)

                    expectedResult : list[tuple] = []
                    for data in TestData:
                        dictData = ToDict(data)
                        if funcs[corIndI](data[leftCols[corIndI]], data[rightCols[corIndI]]) and funcs[corIndI](data[leftCols[corIndI]], reals[corIndI]):
                            if funcs[corIndJ](data[leftCols[corIndJ]], data[rightCols[corIndJ]]) and funcs[corIndJ](data[leftCols[corIndJ]], reals[corIndJ]):
                                resDict = {}
                                for val in colSelection:
                                    resDict[val] = data[val]
                                expectedResult.append(resDict)


        pass


    @staticmethod
    def ClearTestDB():
        con = sqlite3.connect(testConnection)
        con.execute("delete from car_data")
        con.commit()
        con.close()
    @staticmethod
    def StressTestAddTestData():
       def pApplied(data : list) -> None:
           database.add_experiment_data(data, testConnection)
       with ThreadPoolExecutor() as executor:
          for _ in executor.map(pApplied, [ToList(ToDict(data)) for data in TestData]):
              pass

    def StressTestAdd(self):
        self.ClearTestDB()
        self.StressTestAddTestData()
        res : list[list[int | float]] = []
        con = sqlite3.connect(testConnection)
        cur = con.cursor()
        cur.execute("select * from car_data")
        res = cur.fetchall()
        if not( len(res) == len(TestData) and set(res) == set(TestData)):
            return "Test fehlgeschlagen; falsche Daten wurden hinzugefügt"
        return True
    def TestAddData(self):
        self.ClearTestDB()
        for data in TestData:
            try:
                database.add_experiment_data(data, testConnection)
            except:
                return "Fehler bei add_experiement_data, exception wurde gethrowed wo keine sein darf!"
        res : list[list[int | float]] = []
        con = sqlite3.connect(testConnection)
        cur = con.cursor()
        cur.execute("select * from car_data")
        res = cur.fetchall()
        if not( len(res) == len(TestData) and set(res) == set(TestData)):
            return "Test fehlgeschlagen; falsche Daten wurden hinzugefügt"
        self.addedTestData = True
        return True
if __name__ == "__main__":
    # Test Daten
    ALL_COLS = ["generation", "final_drive", "roll_radius", "gear_3", "gear_4", "gear_5", "consumption", "elasticity_3", "elasticity_4", "elasticity_5"];
    testConnection = "..\\TestSimulationDataBase.db";
    TestDataCount = 100;
    TestData : list[tuple] = [];
    for _ in range(TestDataCount):
        data : list[int | float] = [random.randint(0, 100)]
        for _ in range(9):
            data.append(random.random() * 100)
        TestData.append(ToTuple(ToDict(data)))
    inst = ExperiementalDataTests()
    print(inst.TestAddData())
    print(inst.StressTestAdd())
