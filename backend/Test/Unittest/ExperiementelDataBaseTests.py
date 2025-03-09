from ast import Try
import sqlite3
from concurrent.futures import ThreadPoolExecutor
import csv
import UnitMeta
from backend.Test import MetaTest
import asyncio
from backend import database
import copy
import random;
def GetRandomPartition(vals : list) -> list[list]:
    actPartition = []
    while len(vals) > 0:
        k =  random.randint(1, len(vals))
        choice = random.choices(vals, k = k)
        actPartition.append(choice)
        vals = [val for val in vals if not (val in choice)]
    return actPartition
def CSVDataEquals(leftCSV : list[str], right : list[dict]) -> bool:
    leftStr = str(leftCSV)
    rCopy = copy.deepcopy(right)
    for d in rCopy:
        for key in d:
            d[key] = str(d[key])
    return leftStr == str(rCopy)



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
        this.TestAddData()
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
            commands.append(leftCols[i] + " " + ops[i] + " " + str(reals[i]))
        for colSelection in testCols:
            for i in range(len(commands)):
                for j in range(len(commands)):
                    (corIndI, corIndJ) = (i // 2, j // 2)
                    compareRealI = i % 2 == 1
                    compareRealJ = j % 2 == 1
                    (con0, con1) = (commands[i], commands[j])
                    expectedResult : list[dict] = []
                    for data in TestData:
                        dictData = ToDict(data)
                        if (compareRealI or funcs[corIndI](dictData[leftCols[corIndI]], dictData[rightCols[corIndI]])) and (not compareRealI or funcs[corIndI](dictData[leftCols[corIndI]], reals[corIndI])):
                            if (compareRealJ or funcs[corIndJ](dictData[leftCols[corIndJ]], dictData[rightCols[corIndJ]])) and (not compareRealJ or funcs[corIndJ](dictData[leftCols[corIndJ]], reals[corIndJ])):
                                resDict = {}
                                for val in colSelection:
                                    resDict[val] = dictData[val]
                                expectedResult.append(resDict)
                    database.export_experiment_data_to_csv("test.csv", colSelection, [con0, con1], testConnection)
                    result = []
                    with open("test.csv", mode = "r") as file:
                        content = csv.DictReader(file)
                        result = [row for row in content]
                    if not (len(result) == len(expectedResult) and CSVDataEquals(result, expectedResult)):
                        print(con0 + "," + con1 + "," + str(colSelection))
                        return "Fehlgeschlagen mit " + str(result) + "vs " + str(expectedResult)



        return True
    def TestAddExperiementDataFromCSV(self):

        TestPartitionCount : int = 10
        for _ in range(TestPartitionCount):
            partition = GetRandomPartition(TestData)
            self.ClearTestDB()
            i = 0
            for data in partition:
                self.ClearTestDB()
                for val in data:
                    database.add_experiment_data(val, testConnection)
                database.export_experiment_data_to_csv("test" + str(i) + ".csv", ALL_COLS, [], testConnection)
                self.ClearTestDB()
                # first isolated test
                database.add_experiment_data_from_csv("test" + str(i) + ".csv", testConnection)

                datas = self.GetDataFromSQL()


                if len(datas) != len(data) or set(datas) != set(data):
                    return "Isolated Test von add_exp. Data fehlgeschlagen"
                i += 1
            # nun nicht isoliert
            actData = []
            self.ClearTestDB()
            for i in range(len(partition)):
                actData.extend(partition[i])
                database.add_experiment_data_from_csv("test" + str(i) + ".csv", testConnection)
                datas = self.GetDataFromSQL()
                if len(datas) != len(actData) or set(actData) != set(datas):
                    return "Kombinierter Test von add_exp. Data fehlgeschlagen"
        return True
    @staticmethod
    def GetDataFromSQL():
        con = sqlite3.connect(testConnection)
        cur = con.cursor()
        cur.execute("select * from car_data")
        vals = cur.fetchall()
        con.close()
        return vals
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
    def __call__(self, *args, **kwargs):
        self.TestAddData()
        self.StressTestAddTestData()
        self.TestExportData()
        self.TestAddExperiementDataFromCSV()
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
    print(inst.TestExportData())
    print(inst.TestAddExperiementDataFromCSV())