CREATE TABLE creature (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL,
    size CHAR(1),
    type VARCHAR(32),
    subtype VARCHAR(32),
    alignment CHAR(2),
    armor_class SMALLINT,
    armor_description  VARCHAR(32),
    hit_point_max SMALLINT,
    hit_dice SMALLINT,
    hit_dice_type VARCHAR(32),
    speed VARCHAR(32),
    strength SMALLINT,
    dexterity SMALLINT,
    constitution SMALLINT,
    intelligence SMALLINT,
    wisdom SMALLINT,
    charisma SMALLINT,
    constitution_save SMALLINT,
    intelligence_save SMALLINT,
    wisdom_save SMALLINT,
    history SMALLINT,
    perception SMALLINT,
    damage_vulnerabilities VARCHAR(128),
    damage_resistance VARCHAR(128),
    damage_immunities VARCHAR(128),
    condition_immunities VARCHAR(128),
    senses VARCHAR(128),
    languages VARCHAR(128),
    challenge_rating SMALLINT,

    -- arrays ---
    spells uuid ARRAY,
    actions uuid ARRAY,
    special_abilities uuid ARRAY,

    -- spell slots ---
    spell_slot_1_max SMALLINT,
    spell_slot_2_max SMALLINT,
    spell_slot_3_max SMALLINT,
    spell_slot_4_max SMALLINT,
    spell_slot_5_max SMALLINT,
    spell_slot_6_max SMALLINT,
    spell_slot_7_max SMALLINT,
    spell_slot_8_max SMALLINT,
    spell_slot_9_max SMALLINT
);

CREATE TABLE srd_creature (

) INHERITS (creature);

CREATE TABLE custom_creature (
    owner_id uuid NOT NULL
) INHERITS (creature);

CREATE TABLE encounter_creature (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    reference_id uuid NOT NULL,
    encounter_id uuid NOT NULL,
    hit_points SMALLINT,
    temp_hit_points SMALLINT,
    hit_dice SMALLINT,
    armor_class SMALLINT,

    --- spell slots ---
    spell_slot_1_current SMALLINT,
    spell_slot_2_current SMALLINT,
    spell_slot_3_current SMALLINT,
    spell_slot_4_current SMALLINT,
    spell_slot_5_current SMALLINT,
    spell_slot_6_current SMALLINT,
    spell_slot_7_current SMALLINT,
    spell_slot_8_current SMALLINT,
    spell_slot_9_current SMALLINT,

    --- array ---
    conditions uuid ARRAY
);

CREATE TABLE encounter (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    owner_id uuid NOT NULL,
    name VARCHAR(32),
    turn SMALLINT
);