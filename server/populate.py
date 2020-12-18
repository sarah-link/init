import psycopg2, json
from psycopg2.extensions import AsIs

# set up postgreSQL connection
try:
    conn = psycopg2.connect("dbname='rollinit' user='postgres' host='localhost' password='postgres'")
except:
    print("I am unable to connect to the database")

# Utilities
def calculateModifier(abilityScore):
    return (abilityScore - 10) // 2

def parseSize(raw):
    return raw[0].capitalize()

def parseAlignment(raw):
    split = raw.split()
    try:
        return split[0][0].capitalize() + split[1][0].capitalize()
    except:
        return split[0][0].capitalize()

def parseHitDice(raw):
    split = raw.split('d')
    first = split[0]
    splitAgain = split[1].split('+')
    second = splitAgain[0]
    if (len(splitAgain) > 1):
        third = splitAgain[1]
    else:
        third = 0
    return {
        'hit_dice': first,
        'hit_dice_type': "d" + second,
        'hit_dice_bonus': third
    }

def getSavingThrow(creature, ability):
    try:
        return creature[ability + '_save']
    except:
        return calculateModifier(creature[ability])

def tryGetValue(creature, key):
    try:
        if creature[key] == '':
            return None
        else:
            return creature[key]
    except:
        return None

# Population
cur = conn.cursor()

with open('../src/data/monsters.json') as f:
  data = json.load(f)
creatureList = data['creatures']

for c in creatureList:
    creatureDict = {
        'name': c['name'],
        'size': parseSize(c['size']),
        'type': c['type'],
        'subtype': tryGetValue(c, 'subtype'),
        'alignment': parseAlignment(c['alignment']),
        'armor_class': c['armor_class'],
        'armor_description': tryGetValue(c, 'armor_desc'),
        'hit_point_max': c['hit_points'],
        'hit_dice': parseHitDice(c['hit_dice'])['hit_dice'],
        'hit_dice_type': parseHitDice(c['hit_dice'])['hit_dice_type'],
        'hit_dice_bonus': parseHitDice(c['hit_dice'])['hit_dice_bonus'],
        'speed': c['speed'],
        'strength': c['strength'],
        'dexterity': c['dexterity'],
        'constitution': c['constitution'],
        'intelligence': c['intelligence'],
        'wisdom': c['wisdom'],
        'charisma': c['charisma'],
        'strength_save': getSavingThrow(c, 'strength'),
        'dexterity_save': getSavingThrow(c, 'dexterity'),
        'constitution_save': getSavingThrow(c, 'constitution'),
        'intelligence_save': getSavingThrow(c, 'intelligence'),
        'wisdom_save': getSavingThrow(c, 'wisdom'),
        'charisma_save': getSavingThrow(c, 'charisma'),
        'damage_vulnerabilities': tryGetValue(c, 'damage_vulnerabilities'),
        'damage_resistance': tryGetValue(c, 'damage_resistances'),
        'damage_immunities': tryGetValue(c, 'damage_immunities'),
        'senses': c['senses'],
        'languages': c['languages'],
        'challenge_rating': c['challenge_rating']
    }
#     print(creatureDict)
    columns = creatureDict.keys()
    values = [creatureDict[column] for column in columns]
    insertStatement = 'INSERT INTO srd_creature (%s) VALUES %s'

    cur.execute(cur.mogrify(insertStatement, (AsIs(','.join(columns)), tuple(values))))
    conn.commit()

# cur.execute("SELECT * FROM srd_creature")

# rows = cur.fetchall()
# print("Results:")
# for row in rows:
#     print("   ", row)