// Lerninhalte: Österreichisches Recht
// Jeder Themenblock enthält eine Einführung, Kernbegriffe, ein Prüfungsschema
// und Quizfragen im Stil eines Professors, der Studierende auf Klausuren vorbereitet.

const KYVEX_TOPICS = [
  {
    id: "verfassungsrecht",
    title: "Verfassungsrecht",
    subtitle: "B-VG, Grundrechte, Stufenbau der Rechtsordnung",
    intro: `Liebe Studentin, willkommen im österreichischen Verfassungsrecht. Das Bundes-Verfassungsgesetz (B-VG) von 1920 ist das Grundgerüst unseres Staates. Merken Sie sich drei Säulen: den Stufenbau der Rechtsordnung, die Gewaltenteilung und die Grundrechte.`,
    concepts: [
      {
        term: "Stufenbau der Rechtsordnung",
        definition:
          "Rangordnung der Rechtsnormen: Verfassungsrecht > einfache Gesetze > Verordnungen > Bescheide/Urteile. Jede Stufe muss sich an der übergeordneten Stufe messen lassen (Legalitätsprinzip, Art. 18 B-VG).",
      },
      {
        term: "Gewaltenteilung",
        definition:
          "Trennung in Legislative (National-/Bundesrat, Landtage), Exekutive (Bundesregierung, Verwaltung) und Judikative (ordentliche Gerichte, VfGH, VwGH).",
      },
      {
        term: "Grundrechte",
        definition:
          "Vor allem im Staatsgrundgesetz 1867 (StGG) und in der EMRK verankert, seit deren Verfassungsrang 1964 unmittelbar anwendbares Recht in Österreich. Prüfung: Schutzbereich – Eingriff – Rechtfertigung.",
      },
      {
        term: "VfGH vs. VwGH",
        definition:
          "Der Verfassungsgerichtshof prüft Normen auf Verfassungskonformität und entscheidet über Bescheidbeschwerden wegen Verfassungswidrigkeit. Der Verwaltungsgerichtshof prüft Bescheide auf einfache Rechtswidrigkeit.",
      },
    ],
    schema: [
      "1. Schutzbereich des Grundrechts eröffnet?",
      "2. Liegt ein Eingriff der öffentlichen Gewalt vor?",
      "3. Ist der Eingriff gesetzlich gedeckt (Gesetzesvorbehalt)?",
      "4. Ist der Eingriff verhältnismäßig (legitimes Ziel, geeignet, erforderlich, angemessen)?",
    ],
    quiz: [
      {
        q: "Welches Gericht prüft, ob ein Gesetz verfassungswidrig ist?",
        options: ["Oberster Gerichtshof (OGH)", "Verfassungsgerichtshof (VfGH)", "Verwaltungsgerichtshof (VwGH)", "Landesverwaltungsgericht"],
        correct: 1,
        explain: "Der VfGH ist für die Normenkontrolle zuständig – er kann Gesetze und Verordnungen aufheben.",
      },
      {
        q: "Was besagt das Legalitätsprinzip (Art. 18 B-VG)?",
        options: [
          "Gesetze dürfen rückwirkend gelten",
          "Die gesamte staatliche Verwaltung darf nur aufgrund der Gesetze ausgeübt werden",
          "Nur der Bundespräsident darf Gesetze erlassen",
          "Verordnungen stehen über Gesetzen",
        ],
        correct: 1,
        explain: "Art. 18 Abs. 1 B-VG bindet die Verwaltung strikt an bestehende Gesetze.",
      },
      {
        q: "Seit wann hat die EMRK in Österreich Verfassungsrang?",
        options: ["1920", "1945", "1964", "1995"],
        correct: 2,
        explain: "Durch BGBl. 59/1964 wurde der EMRK Verfassungsrang eingeräumt.",
      },
    ],
  },
  {
    id: "zivilrecht",
    title: "Zivilrecht (ABGB)",
    subtitle: "Vertragsrecht, Schadenersatz, Verjährung",
    intro: `Kommen wir zum Allgemeinen Bürgerlichen Gesetzbuch, dem ABGB von 1811 – eines der ältesten noch geltenden Zivilgesetzbücher Europas. Zentral sind das Vertragsrecht und das Schadenersatzrecht.`,
    concepts: [
      {
        term: "Vertragsabschluss",
        definition:
          "Ein Vertrag kommt durch übereinstimmende Willenserklärungen zustande: Angebot (§ 861 ABGB) und Annahme. Beide müssen ernstlich, bestimmt und in Bindungsabsicht abgegeben werden.",
      },
      {
        term: "Verschulden (§ 1295 ff ABGB)",
        definition:
          "Schadenersatz setzt grundsätzlich Schaden, Kausalität, Rechtswidrigkeit und Verschulden (Vorsatz oder Fahrlässigkeit) voraus. Ausnahmen: Gefährdungshaftung ohne Verschulden (z.B. EKHG).",
      },
      {
        term: "Gewährleistung vs. Schadenersatz",
        definition:
          "Gewährleistung (§ 922 ff ABGB) knüpft verschuldensunabhängig an einen Mangel der Sache an; Schadenersatz erfordert zusätzlich Verschulden und einen darüber hinausgehenden Vermögensschaden.",
      },
      {
        term: "Verjährung",
        definition:
          "Allgemeine Verjährungsfrist 30 Jahre (§ 1478 ABGB), kurze Verjährung 3 Jahre für die meisten schuldrechtlichen Ansprüche (§ 1489 ABGB) ab Kenntnis von Schaden und Schädiger.",
      },
    ],
    schema: [
      "1. Liegt ein wirksamer Vertrag vor (Angebot + Annahme, Geschäftsfähigkeit)?",
      "2. Bei Schadenersatz: Schaden – Kausalität – Rechtswidrigkeit – Verschulden prüfen.",
      "3. Gibt es einen Rechtfertigungsgrund (z.B. Notwehr, Einwilligung)?",
      "4. Ist der Anspruch verjährt?",
    ],
    quiz: [
      {
        q: "Wie lange beträgt die kurze Verjährungsfrist nach § 1489 ABGB?",
        options: ["1 Jahr", "3 Jahre", "10 Jahre", "30 Jahre"],
        correct: 1,
        explain: "3 Jahre ab Kenntnis von Schaden und Schädiger, sonst absolut 30 Jahre.",
      },
      {
        q: "Was ist der zentrale Unterschied zwischen Gewährleistung und Schadenersatz?",
        options: [
          "Gewährleistung erfordert Verschulden, Schadenersatz nicht",
          "Schadenersatz erfordert zusätzlich Verschulden, Gewährleistung ist verschuldensunabhängig",
          "Beide sind identisch geregelt",
          "Gewährleistung gilt nur im Strafrecht",
        ],
        correct: 1,
        explain: "Gewährleistung knüpft rein am objektiven Mangel an, Schadenersatz zusätzlich am Verschulden.",
      },
      {
        q: "Welche Elemente müssen für Schadenersatz nach § 1295 ABGB grundsätzlich vorliegen?",
        options: [
          "Nur ein Schaden",
          "Schaden, Kausalität, Rechtswidrigkeit, Verschulden",
          "Nur Vorsatz",
          "Nur ein Vertrag",
        ],
        correct: 1,
        explain: "Das ist der klassische vierstufige Prüfungsaufbau im Schadenersatzrecht.",
      },
    ],
  },
  {
    id: "strafrecht",
    title: "Strafrecht (StGB)",
    subtitle: "Deliktsaufbau, Vorsatz/Fahrlässigkeit, Notwehr",
    intro: `Im Strafrecht arbeiten wir streng nach dem dreistufigen Deliktsaufbau: Tatbestand, Rechtswidrigkeit, Schuld. Jede Strafbarkeitsprüfung folgt dieser Reihenfolge – ohne Ausnahme.`,
    concepts: [
      {
        term: "Tatbestandsmäßigkeit",
        definition:
          "Objektiver Tatbestand (Handlung, Erfolg, Kausalität) und subjektiver Tatbestand (Vorsatz gem. § 5 StGB oder Fahrlässigkeit gem. § 6 StGB) müssen erfüllt sein.",
      },
      {
        term: "Vorsatzformen (§ 5 StGB)",
        definition:
          "Absicht (dolus directus 1. Grades), Wissentlichkeit (dolus directus 2. Grades) und bedingter Vorsatz (dolus eventualis – Ernstnehmen der Möglichkeit und Abfinden damit).",
      },
      {
        term: "Rechtswidrigkeit",
        definition:
          "Grundsätzlich indiziert durch die Tatbestandsmäßigkeit, entfällt bei Rechtfertigungsgründen wie Notwehr (§ 3 StGB) oder rechtfertigendem Notstand (§ 3a StGB).",
      },
      {
        term: "Schuld",
        definition:
          "Zurechnungsfähigkeit (§ 11 StGB), Unrechtsbewusstsein bzw. dessen Vermeidbarkeit, und keine Entschuldigungsgründe (z.B. entschuldigender Notstand § 10 StGB).",
      },
    ],
    schema: [
      "1. Objektiver Tatbestand: Handlung, Erfolg, Kausalität, objektive Zurechnung.",
      "2. Subjektiver Tatbestand: Vorsatz (§ 5) oder Fahrlässigkeit (§ 6).",
      "3. Rechtswidrigkeit: Rechtfertigungsgründe prüfen (Notwehr, Notstand, Einwilligung).",
      "4. Schuld: Zurechnungsfähigkeit, Unrechtsbewusstsein, Entschuldigungsgründe.",
    ],
    quiz: [
      {
        q: "Was ist 'dolus eventualis'?",
        options: [
          "Fahrlässiges Handeln ohne jede Voraussicht",
          "Absichtliches Handeln mit direktem Ziel",
          "Bedingter Vorsatz: Der Täter hält den Erfolg ernstlich für möglich und findet sich damit ab",
          "Ein Rechtfertigungsgrund",
        ],
        correct: 2,
        explain: "§ 5 Abs. 1 StGB: bedingter Vorsatz liegt vor, wenn der Täter die Verwirklichung für ernstlich möglich hält und sich damit abfindet.",
      },
      {
        q: "In welcher Prüfungsstufe wird Notwehr (§ 3 StGB) geprüft?",
        options: ["Objektiver Tatbestand", "Subjektiver Tatbestand", "Rechtswidrigkeit", "Schuld"],
        correct: 2,
        explain: "Notwehr ist ein Rechtfertigungsgrund und schließt die Rechtswidrigkeit aus.",
      },
      {
        q: "Was prüft man auf der Ebene der Schuld?",
        options: [
          "Ob überhaupt eine Handlung vorliegt",
          "Ob Kausalität zwischen Handlung und Erfolg besteht",
          "Zurechnungsfähigkeit und Unrechtsbewusstsein des Täters",
          "Ob ein Rechtfertigungsgrund vorliegt",
        ],
        correct: 2,
        explain: "Schuld betrifft die persönliche Vorwerfbarkeit: Zurechnungsfähigkeit, Unrechtsbewusstsein, Entschuldigungsgründe.",
      },
    ],
  },
  {
    id: "verwaltungsrecht",
    title: "Verwaltungsrecht",
    subtitle: "Bescheid, Instanzenzug, Rechtsschutz",
    intro: `Zum Abschluss das Verwaltungsrecht: Wie handelt die Verwaltung, und wie wehrt sich der Bürger dagegen? Der Bescheid ist das zentrale Handlungsinstrument der Verwaltung.`,
    concepts: [
      {
        term: "Bescheid",
        definition:
          "Individuell-konkreter, hoheitlicher Verwaltungsakt einer Behörde gegenüber einer bestimmten Person in einer bestimmten Angelegenheit. Muss Spruch, Begründung und Rechtsmittelbelehrung enthalten.",
      },
      {
        term: "Verordnung",
        definition:
          "Generell-abstrakte Norm der Verwaltung, richtet sich an eine unbestimmte Zahl von Personen – im Gegensatz zum individuellen Bescheid.",
      },
      {
        term: "Instanzenzug seit 2014",
        definition:
          "Seit der Verwaltungsgerichtsbarkeits-Novelle 2012/2014 entscheiden Verwaltungsgerichte (Landesverwaltungsgerichte, Bundesverwaltungsgericht) über Beschwerden gegen Bescheide, nicht mehr die frühere administrative Berufungsinstanz.",
      },
      {
        term: "Beschwerde an VwGH/VfGH",
        definition:
          "Gegen Erkenntnisse der Verwaltungsgerichte ist Revision an den VwGH (wegen Rechtswidrigkeit) oder Beschwerde an den VfGH (wegen Verfassungswidrigkeit) möglich.",
      },
    ],
    schema: [
      "1. Liegt ein Bescheid (individuell-konkret) oder eine Verordnung (generell-abstrakt) vor?",
      "2. Ist die Behörde zuständig (sachlich, örtlich)?",
      "3. Wurde das Verfahren (Parteiengehör, AVG) eingehalten?",
      "4. Welcher Rechtsschutz steht offen: Beschwerde an das Verwaltungsgericht, danach Revision/Beschwerde an VwGH/VfGH?",
    ],
    quiz: [
      {
        q: "Was unterscheidet einen Bescheid von einer Verordnung?",
        options: [
          "Der Bescheid ist generell-abstrakt, die Verordnung individuell-konkret",
          "Der Bescheid ist individuell-konkret, die Verordnung generell-abstrakt",
          "Beide sind gerichtliche Entscheidungen",
          "Es gibt keinen Unterschied",
        ],
        correct: 1,
        explain: "Der Bescheid richtet sich an eine bestimmte Person, die Verordnung an einen unbestimmten Adressatenkreis.",
      },
      {
        q: "Wer entscheidet seit der Reform 2014 in erster Instanz über Beschwerden gegen Bescheide?",
        options: [
          "Die jeweils übergeordnete Verwaltungsbehörde",
          "Der Verfassungsgerichtshof direkt",
          "Die Landesverwaltungsgerichte bzw. das Bundesverwaltungsgericht",
          "Der Oberste Gerichtshof",
        ],
        correct: 2,
        explain: "Die Verwaltungsgerichtsbarkeits-Novelle hat die administrativen Berufungsinstanzen durch Verwaltungsgerichte ersetzt.",
      },
      {
        q: "Woraus muss ein Bescheid mindestens bestehen?",
        options: [
          "Nur aus einem Spruch",
          "Spruch, Begründung und Rechtsmittelbelehrung",
          "Nur aus einer Rechtsmittelbelehrung",
          "Einer formlosen Mitteilung",
        ],
        correct: 1,
        explain: "§ 58 AVG verlangt Spruch, Begründung und Rechtsmittelbelehrung als notwendige Bestandteile.",
      },
    ],
  },
];
