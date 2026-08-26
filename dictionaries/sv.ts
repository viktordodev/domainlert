import type { Dictionary } from "./en";

// Svenska — primärspråket. Type-checkas mot `Dictionary` (härledd ur en.ts) så att en saknad
// eller omdöpt nyckel bryter bygget. Se en.ts för hur prosablock (sträng[] med "- " för listor
// och "[text](/sökväg)" för länkar) ska struktureras.

const sv: Dictionary = {
  common: {
    startMonitoring: "Börja bevaka",
    openDashboard: "Öppna panelen",
    openYourDashboard: "Öppna din panel",
    logIn: "Logga in",
    logOut: "Logga ut",
    returnHome: "Tillbaka till DomainLert",
    backToHome: "Till startsidan",
  },

  nav: {
    tools: "Verktyg",
    products: [
      { name: "DomainLert", description: "Bevakning av domäners utgång" },
      { name: "Task Ledger", description: "Enkel uppgiftshantering" },
      { name: "DNS Lens", description: "Hälsokontroller för DNS" },
    ],
    product: "Produkt",
    solutions: "Lösningar",
    resources: "Resurser",
    pricing: "Priser",
    homeAriaLabel: "DomainLert startsida",
    mainNavigation: "Huvudmeny",
    mobileNavigation: "Mobilmeny",
    openNavigation: "Öppna menyn",
    openAccountMenu: "Öppna kontomenyn",
    accountMenu: "Kontomeny",
    dashboard: "Panel",
    profile: "Profil",
    language: "Språk",
    languageNames: { sv: "Svenska", en: "English" },
    switchToSwedish: "Byt till svenska",
    switchToEnglish: "Switch to English",
  },

  themeToggle: {
    light: "Ljust",
    dark: "Mörkt",
    switchToLight: "Byt till ljust läge",
    switchToDark: "Byt till mörkt läge",
  },

  footer: {
    tagline: "Håller tyst koll på det som inte får glömmas bort.",
    links: {
      product: "Produkt",
      resources: "Resurser",
      pricing: "Priser",
      about: "Om oss",
      contact: "Kontakt",
      terms: "Villkor",
      privacy: "Integritet",
    },
    copyright: "© 2026 DomainLert. Byggt för färre nödsituationer.",
  },

  meta: {
    defaultTitle: "DomainLert | Vet innan dina domäner går ut",
    titleTemplate: "%s | DomainLert",
    defaultDescription:
      "Bevakning av domäners utgångsdatum för byråer och team som inte har råd med en missad förnyelse. Dagliga kontroller, valbara påminnelser och bulkimport — gratis medan vi är i tidig access.",
  },

  og: {
    title: "Vet innan dina domäner går ut.",
    subtitle:
      "Bevakning av domäners utgångsdatum för byråer och team som inte har råd med en missad förnyelse.",
  },

  dashboardPreview: {
    label: "Bevakade domäner",
    domains: "{count} domäner",
    monitoringActive: "● BEVAKNING AKTIV",
    goodMorningAlex: "God morgon, Alex",
    date: "21 AUG 2026",
    domainsHealthy: "domäner friska",
    days: "{count} dagar",
    lastChecked: "Senast kontrollerad idag 08:04",
    viewAll: "Visa alla domäner →",
    ariaHome: "En förhandsvisning av DomainLerts panel för domänbevakning",
    ariaFeatures: "En kommenterad förhandsvisning av DomainLerts panel",
  },

  home: {
    hero: {
      eyebrow: "Bevakning av domäners utgång",
      titleLine1: "Få aldrig reda på det",
      titleEm: "för sent.",
      text: "Domänförnyelser är lätta att glömma och dyra att missa. DomainLert bevakar dina domäner, kontrollerar datumen och säger till rätt person medan det fortfarande finns tid att agera.",
      seeHow: "Se hur det fungerar",
      note: "Gratis medan vi är i tidig access. Inget kreditkort krävs.",
    },
    proof: {
      heading: "För dem som håller verksamheten igång",
      audiences: ["BYRÅER", "IT-DRIFT", "STARTUPS", "FRILANSARE"],
    },
    product: {
      kicker: "Den nyttiga sortens påminnelse",
      titleLine1: "En liten varning",
      titleEm: "slår en stor uppröjning.",
      features: [
        {
          title: "En tydlig lista",
          body: "Importera dina domäner i bulk och se sedan utgångsdatum, ägare och hur brådskande det är i en och samma lugna vy.",
        },
        {
          title: "Eskalering som anpassar sig",
          body: "Påminnelser 30, 14 och 7 dagar innan som standard — lägg till upp till 5 egna trösklar per domän och skicka dem till den som faktiskt kan förnya.",
        },
        {
          title: "Bevis, inte gissningar",
          body: "Behåll kontrollhistoriken och registraruppgifterna du behöver för att bekräfta att en förnyelse verkligen gjordes.",
        },
      ],
      seeAll: "Se alla funktioner →",
    },
    dark: {
      kicker: "Byggt för ansvar",
      titleLine1: "För att ”jag trodde",
      titleLine2: "du hade koll” inte är",
      titleEm: "en rutin.",
      quote:
        "”Vi hanterar domäner åt 18 kunder. DomainLert ger varje förnyelse en tydlig ägare, utan ännu ett kalkylark att passa.”",
      quoteAuthor: "Driftansvarig, digitalbyrå",
    },
    pricing: {
      kicker: "Gratis i tidig access",
      title: "Gratis",
      titleSub: "än så länge",
      annual:
        "Alla funktioner ingår för de första 100 kontona. Planerat pris efter tidig access: 8 USD/månad, årsvis fakturerat till 96 USD.*",
      usageNote: "* Policy för skälig användning gäller. Inget kreditkort krävs.",
      everythingYouNeed: "Allt du behöver för att ligga steget före utgången:",
      bullets: [
        "Dagliga domänkontroller",
        "Valbara påminnelser — 30/14/7 dagar som standard, upp till 5 egna per domän",
        "Bulkimport och domänhistorik",
        "Flera påminnelsemottagare per domän",
      ],
      fullDetails: "Alla prisuppgifter →",
    },
    faq: {
      kicker: "Frågor, besvarade",
      title: "Bra att veta.",
      items: [
        {
          question: "Förnyar DomainLert mina domäner åt mig?",
          answer:
            "Nej. Vi ser till att rätt person vet när det är dags att förnya. Du behåller kontrollen över registraren och förnyelsen.",
        },
        {
          question: "Vad är policyn för skälig användning?",
          answer:
            "Planen omfattar normal domänbevakning av din portfölj. Vi kan höra av oss om ett konto genererar ovanligt hög eller missbrukande automatiserad trafik, så att tjänsten förblir pålitlig för alla.",
        },
        {
          question: "Hur får jag veta när en domän behöver åtgärdas?",
          answer:
            "DomainLert kontrollerar dina domäner dagligen och mejlar dig vid de trösklar du valt — 30, 14 och 7 dagar före utgång som standard, med upp till 5 egna trösklar per domän — så att det finns tid att agera.",
        },
        {
          question: "Kan jag importera domäner i bulk?",
          answer:
            "Ja. Klistra in en lista med domäner för att importera dem tillsammans och gå sedan igenom deras utgångsdatum och status från en och samma panel.",
        },
        {
          question: "Kan påminnelser gå till fler än en person?",
          answer:
            "Ja. Lägg till flera påminnelsemottagare så att förnyelser når ägaren, kunden eller kollegan som ansvarar för att agera.",
        },
        {
          question: "Är DomainLert gratis?",
          answer:
            "Det är gratis medan vi är i tidig access — de första 100 kontona får alla funktioner utan kostnad, utan kreditkort. Därefter är det planerade priset 8 USD/månad; alla som redan registrerat sig får gott om varsel innan det ändras.",
        },
      ],
    },
    finalCta: {
      kicker: "Gör nästa förnyelse tråkig",
      titleLine1: "Vet innan",
      titleEm: "du måste veta.",
    },
  },

  features: {
    meta: {
      title: "Funktioner",
      description:
        "Hur DomainLert håller reda på domäner, kontrollerar utgången dagligen, aviserar rätt personer och för journal — gås igenom funktion för funktion.",
    },
    hero: {
      eyebrow: "Funktioner",
      title: "Allt du behöver för att ligga steget före utgången.",
      text: "Inga paneler att konfigurera, inga integrationer att koppla ihop. Importera dina domäner, ange dina trösklar, så tar DomainLert vid därifrån.",
    },
    legend: [
      {
        title: "Hälsoring",
        body: "Hela portföljens status i ett ögonkast — hur många domäner som är friska just nu.",
      },
      {
        title: "Domänrader",
        body: "Status, namn och antal dagar kvar för varje domän — sök, sortera och bläddra i takt med att listan växer.",
      },
      {
        title: "Uppmärksamhetsflaggor",
        body: "Allt som snart går ut markeras direkt, så att det aldrig begravs i en lång lista.",
      },
    ],
    items: [
      {
        title: "Bulkimport av domäner",
        body: "Klistra in en lista med domäner — kommatecken, mellanslag eller radbrytningar, valfri blandning fungerar — så avdubblerar, validerar och importerar DomainLert dem i ett svep.",
      },
      {
        title: "Dagliga automatiska kontroller",
        body: "Varje domän kontrolleras mot aktuella registerdata enligt ett regelbundet schema, med de domäner som inte verifierats på längst tid först.",
      },
      {
        title: "Valbara påminnelsetrösklar",
        body: "Påminnelser skickas som standard 30, 14 och 7 dagar före utgång. Åsidosätt standarden per konto, eller ange upp till 5 egna trösklar för en enskild domän.",
      },
      {
        title: "Flera påminnelsemottagare",
        body: "Skicka en domäns påminnelser till upp till 3 e-postadresser — kunden, IT-ansvarig, den som faktiskt förnyar den — i stället för bara din egen inkorg.",
      },
      {
        title: "Status i ett ögonkast",
        body: "Varje domän visas som aktiv, går snart ut, utgången eller kontroll misslyckades, med en hälsoring som sammanfattar hela portföljen högst upp i panelen.",
      },
      {
        title: "Kontrollhistorik",
        body: "Se när en domän senast verifierades och vilken registrar den pekade på, så att du har underlag att hänvisa till när någon frågar ”kontrollerade vi den här?”",
      },
      {
        title: "Sök, sortera och bläddra",
        body: "Hitta vilken domän som helst direkt, sortera på namn eller aktiv status, och bläddra i listor om 10, 25 eller 100 utan att gränssnittet blir trögt.",
      },
      {
        title: "Byggt för riktiga portföljer",
        body: "Upp till 1 000 domäner per konto. Hanterar du fler än så visar vi ett tydligt meddelande som hänvisar dig till supporten — aldrig ett tyst fel.",
      },
    ],
    finalCta: {
      text: "Se det på dina egna domäner",
      titleLine1: "Importera din lista",
      titleEm: "och se själv.",
    },
  },

  pricing: {
    meta: {
      title: "Priser",
      description:
        "DomainLert är gratis medan vi är i tidig access — de första 100 kontona får alla funktioner utan kostnad. Planerat pris därefter är 8 USD/månad, årsvis fakturerat till 96 USD.",
    },
    hero: {
      eyebrow: "Priser",
      title: "Gratis för de första 100.",
      text: "DomainLert är gratis medan vi är i tidig access. De första 100 kontona får alla funktioner utan kostnad — inget kreditkort, ingen provperiodsklocka. Därefter är det planerade priset 8 USD/månad.",
    },
    card: {
      tag: "Tidig access",
      title: "Gratis",
      titleSub: "än så länge",
      annual:
        "Alla funktioner ingår, upp till 1 000 domäner. Planerat pris när tidig access tar slut: 8 USD/månad, årsvis fakturerat till 96 USD.",
      note: "Inget kreditkort krävs. Policy för skälig användning gäller.",
    },
    included: {
      title: "Vad som ingår",
      text: "Varje konto får hela produkten, gratis medan vi är i tidig access — inget hålls tillbaka för en högre nivå.",
      list: [
        "Dagliga automatiska utgångskontroller för hela din domänlista",
        "Valbara påminnelsetrösklar — 30/14/7 dagar som standard, upp till 5 egna per domän",
        "Upp till 3 egna påminnelsemottagare per domän, så att förnyelser når rätt person",
        "Bulkimport genom att klistra in en lista — kommatecken, mellanslag eller radbrytningar",
        "Registrar- och senast kontrollerad-historik för varje domän",
        "E-postsupport",
      ],
    },
    cap: {
      title: "Taket på 1 000 domäner",
      text: "DomainLert är byggt för portföljer, inte bara en handfull domäner — men varje konto har ett tak på 1 000 domäner. Det håller tjänsten snabb och förutsägbar för alla.",
      notice:
        "Om du hanterar fler än 1 000 domäner, eller närmar dig gränsen, [kontakta oss](/contact) innan du slår i taket — vi hjälper dig planera nästa steg i stället för att du får reda på det mitt i en import.",
    },
    faq: {
      title: "Vanliga frågor",
      items: [
        {
          question: "Är det verkligen gratis?",
          answer:
            "Ja. DomainLert är gratis medan vi är i tidig access, och de första 100 kontona får alla funktioner utan kostnad. Inget kreditkort krävs och ingen provperiodsklocka tickar.",
        },
        {
          question: "Vad händer efter de första 100 kontona?",
          answer:
            "Vi planerar att införa en betalplan — 8 USD/månad, årsvis fakturerat till 96 USD — för konton som registrerar sig efter det. Vi bestämmer närmare tillfället hur de tidigaste kontona hanteras, och alla som redan registrerat sig får gott om varsel innan något med deras konto ändras.",
        },
        {
          question: "Måste jag ange betaluppgifter?",
          answer:
            "Nej. Du kan skapa ett konto och börja bevaka domäner direkt, utan något kort registrerat.",
        },
        {
          question: "Vad händer om jag når taket på 1 000 domäner?",
          answer:
            "Nya domäner blockeras när du når taket, och du får ett tydligt meddelande i appen som hänvisar dig till supporten — aldrig ett tyst fel. Hör av dig innan du är nära så hjälper vi dig planera framåt.",
        },
        {
          question: "Kan jag avsluta när som helst?",
          answer:
            "Det finns inget att avsluta medan det är gratis — sluta använda tjänsten eller radera ditt konto när du vill. När betalplaner väl finns kan du avsluta när som helst för att stoppa framtida förnyelser.",
        },
      ],
    },
    finalCta: {
      text: "Redo när du är",
      titleLine1: "Börja bevaka",
      titleEm: "på några minuter.",
    },
    jsonLd: {
      productDescription:
        "Bevakning av domäners utgång med dagliga kontroller, valbara påminnelser och bulkimport.",
    },
  },

  about: {
    meta: {
      title: "Om oss",
      description:
        "Varför DomainLert finns, vad tjänsten gör och inte gör, och principerna bakom hur den är byggd.",
    },
    eyebrow: "Varför det här finns",
    title: "Om DomainLert",
    sections: [
      {
        heading: "Problemet",
        body: [
          "Att en domän förfaller är sällan ett tekniskt fel — det är ett ägarskapsfel. Någon antog att någon annan bevakade förnyelsedatumet. För en enskild privat domän är det en olägenhet. För en byrå som hanterar dussintals kunddomäner, eller en startup vars investerarvända webbplats släcks ned över en helg, är det förlorade affärer, förlorat förtroende och ett obehagligt telefonsamtal.",
          "Kalenderpåminnelser och kalkylark fungerar tills de inte gör det — en domän som lagts till utanför den vanliga processen, en påminnelse satt på fel år, en kund som bytt registrar utan att säga något. DomainLert finns för att göra det felläget strukturellt svårare: en lista, kontrollerad automatiskt, med påminnelser som går till den person som faktiskt kan agera.",
        ],
      },
      {
        heading: "Vad tjänsten gör — och inte gör",
        body: [
          "DomainLert kontrollerar dina domäner mot registerdata enligt ett regelbundet schema och mejlar dig innan de går ut, vid trösklar du styr. Det är hela jobbet.",
          "Den förnyar inte domäner åt dig, hanterar inte ditt registrarkonto och garanterar inte att en förnyelse sker. Du behåller kontrollen över registraren och beslutet — DomainLerts uppgift är att se till att du aldrig får reda på det för sent.",
        ],
      },
      {
        heading: "Hur vi bygger det här",
        body: [
          "Vi säger hellre mindre och låter det stämma. Du kommer att se konkreta, kontrollerbara påståenden här — vad som kontrolleras, hur ofta, vad en plan faktiskt innehåller — i stället för vaga löften. Det är gratis medan vi är i tidig access, med de första 100 kontona utan kostnad och en enda fast plan på 8 USD/månad planerad därefter. Ingen prissättning per domän, och ett domäntak som anges i förväg i stället för att upptäckas den hårda vägen.",
        ],
      },
      {
        heading: "Hur dina uppgifter hanteras",
        body: [
          "Vi samlar in det som behövs för att bevaka dina domäner och avisera dig: din e-post, domänerna du lägger till, deras utgångsdata och dina påminnelseinställningar. Vi säljer det inte, och vi använder inte din domänlista till något utöver att driva tjänsten. Se [integritetspolicyn](/privacy) för alla detaljer.",
        ],
      },
      {
        heading: "Frågor",
        body: [
          "Om något här inte stämmer med vad du ser i produkten, eller om du bara vill fråga innan du bestämmer dig, [hör av dig](/contact).",
        ],
      },
    ],
  },

  contact: {
    meta: {
      title: "Kontakt",
      description:
        "Hör av dig till DomainLert för support, frågor om fakturering, eller om ditt konto närmar sig taket på 1 000 domäner.",
    },
    eyebrow: "Hör av dig",
    title: "Kontakt",
    sections: [
      {
        heading: "Support och fakturering",
        body: [
          "Frågor om ditt konto, påminnelser som inte kommer fram, eller något annat om DomainLert — mejla [support@domainlert.com](mailto:support@domainlert.com) så återkommer vi.",
        ],
      },
      {
        heading: "Närmar du dig taket på 1 000 domäner?",
        body: [
          "Varje konto har en gräns på 1 000 domäner. Om du hanterar en portfölj som närmar sig gränsen, hör av dig till [support@domainlert.com](mailto:support@domainlert.com) innan du slår i den — vi hjälper dig hellre planera framåt än att du får reda på det mitt i en import.",
        ],
      },
      {
        heading: "Försäljning och övriga frågor",
        body: [
          "Utvärderar du DomainLert för ett team, eller har du en fråga som den här webbplatsen inte besvarade? Skicka den till [support@domainlert.com](mailto:support@domainlert.com) — samma adress når oss för allt.",
        ],
      },
    ],
  },

  privacy: {
    meta: {
      title: "Integritetspolicy",
      description:
        "Hur DomainLert samlar in, använder och skyddar informationen bakom ditt konto för domänbevakning.",
    },
    eyebrow: "Så hanteras informationen",
    title: "Integritetspolicy",
    updated: "Gäller från 24 augusti 2026",
    sections: [
      {
        heading: "Vad vi samlar in",
        body: [
          "När du använder DomainLert kan vi samla in din e-postadress, kontouppgifter, profilinformation, domännamn, utgångsdata, påminnelseinställningar, mottagaradresser och information om hur tjänsten används. Vi tar även emot information som du väljer att skicka via formulär eller supportärenden.",
        ],
      },
      {
        heading: "Hur vi använder den",
        body: [
          "Vi använder informationen för att tillhandahålla domänbevakning, kontrollera utgångsinformation, skicka konfigurerade påminnelser, autentisera konton, hantera betalningar där det är tillämpligt, säkra tjänsten och förbättra tillförlitligheten. Vi använder inte domännamn för att tillhandahålla offentliga kataloglistningar.",
        ],
      },
      {
        heading: "För användare i EU",
        body: [
          "Om du befinner dig i Europeiska unionen eller Europeiska ekonomiska samarbetsområdet ger tillämplig dataskyddslagstiftning, inklusive GDPR, dig ytterligare rättigheter. Vi behandlar personuppgifter när det är nödvändigt för att tillhandahålla ditt konto och din bevakningstjänst, för att uppfylla rättsliga skyldigheter, för att skydda tjänsten, eller med stöd av våra berättigade intressen. Där vi förlitar oss på samtycke kan du återkalla det när som helst.",
          "Med förbehåll för rättsliga begränsningar kan du be oss att få tillgång till, rätta, radera eller begränsa behandlingen av dina personuppgifter. Du kan även invända mot behandling som grundas på berättigade intressen, begära en portabel kopia av information du lämnat, och lämna in ett klagomål till din lokala tillsynsmyndighet för dataskydd.",
          "Vissa tjänsteleverantörer kan behandla information utanför EU eller EES. Där det krävs använder vi en lämplig överföringsmekanism, såsom ett beslut om adekvat skyddsnivå eller godkända standardavtalsklausuler, och tillämpar avtalsmässiga och tekniska skyddsåtgärder som är lämpliga för uppgifterna.",
        ],
      },
      {
        heading: "Delning av information",
        body: [
          "Vi delar information endast i den mån det behövs för att driva DomainLert, till exempel med leverantörer av hosting, autentisering, databas, e-postleverans, betalning och domändata. Vi kan även lämna ut information när lagen kräver det eller för att skydda tjänsten och dess användare. Vi säljer inte personuppgifter.",
        ],
      },
      {
        heading: "Lagring och säkerhet",
        body: [
          "Vi behåller konto- och bevakningsdata så länge det behövs för att tillhandahålla tjänsten eller uppfylla rättsliga skyldigheter. Vi använder åtkomstkontroller och hanterad infrastruktur som är utformad för att skydda informationen vi lagrar, men ingen onlinetjänst kan garantera absolut säkerhet.",
        ],
      },
      {
        heading: "Dina val",
        body: [
          "Du kan uppdatera profilinformation, ändra påminnelsemottagare eller radera bevakade domäner från ditt konto. Du kan avsluta ditt konto genom att kontakta oss via uppgifterna som lämnats med ditt konto. Vissa uppgifter kan finnas kvar där lagring krävs enligt lag eller behövs för att lösa tvister.",
        ],
      },
      {
        heading: "Cookies och analys",
        body: [
          "DomainLert använder nödvändiga cookies eller liknande lagring för att hålla dig inloggad och skydda autentiserade sessioner. Vi kan använda begränsad driftinformation för att diagnostisera fel och förstå tjänstens prestanda.",
        ],
      },
      {
        heading: "Ändringar och kontakt",
        body: [
          "Vi kan uppdatera denna policy när våra rutiner eller rättsliga skyldigheter förändras. Datumet ovan visar när den senast reviderades. Frågor om integritet kan ställas via vår [kontaktsida](/contact).",
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: "Användarvillkor",
      description:
        "Villkoren som gäller när du använder DomainLert för att bevaka och bli aviserad om domäners utgång, inklusive vad tjänsten inte garanterar.",
    },
    eyebrow: "De praktiska detaljerna",
    title: "Användarvillkor",
    updated: "Gäller från 26 augusti 2026",
    sections: [
      {
        heading: "Att använda DomainLert",
        body: [
          "DomainLert hjälper dig att bevaka domäners utgångsdatum och skicka påminnelser. Genom att skapa ett konto eller använda tjänsten godkänner du dessa villkor. Om du inte godkänner dem ska du inte använda DomainLert. Du samtycker till att använda tjänsten lagligt och att hålla dina kontouppgifter korrekta.",
        ],
      },
      {
        heading: "Vem som tillhandahåller tjänsten",
        body: [
          "DomainLert drivs från Sverige, inom Europeiska unionen. I dessa villkor avser ”DomainLert”, ”vi”, ”oss” och ”vår” den som driver tjänsten, och ”du” avser den person eller organisation som använder den.",
        ],
      },
      {
        heading: "Ditt konto",
        body: [
          "Du ansvarar för att skydda dina inloggningsuppgifter och för aktivitet som utförs via ditt konto. Meddela oss omgående om du tror att ditt konto har använts utan tillstånd. Du måste kunna ingå ett bindande avtal för att använda DomainLert, och om du använder den för en organisation intygar du att du är behörig att godkänna dessa villkor för dess räkning.",
        ],
      },
      {
        heading: "Godtagbar användning",
        body: [
          "När du använder DomainLert samtycker du till att inte:",
          "- bryta mot lagen, göra intrång i andras rättigheter, eller bevaka domäner som du inte har någon legitim anledning att följa;",
          "- lägga till mottagares e-postadresser utan mottagarens tillstånd;",
          "- lägga ovanlig, automatiserad eller missbrukande belastning på tjänsten, eller försöka kringgå kontogränser;",
          "- undersöka, skanna eller testa tjänstens säkerhet, eller försöka komma åt data som inte är dina;",
          "- vidaresälja eller tillhandahålla tjänsten till tredje part annat än som en del av att hantera domäner som du ansvarar för.",
          "Vi kan utreda misstänkt missbruk och vidta lämpliga åtgärder, inklusive att stänga av eller avsluta konton.",
        ],
      },
      {
        heading: "Vad DomainLert är — och inte är",
        body: [
          "DomainLert är ett kompletterande påminnelseverktyg. Den läser offentligt tillgänglig domäninformation från tredjepartskällor såsom RDAP- och WHOIS-tjänster, som kan vara fördröjda, ofullständiga, inkonsekventa eller felaktiga, och som kan vara otillgängliga när som helst.",
          "DomainLert är inte:",
          "- en registrar — den förnyar, registrerar, överför eller hanterar inte domäner;",
          "- ett system of record för din domänportfölj eller dina förnyelsedatum;",
          "- en garanti för att en domän kommer att förnyas, eller för att du kommer att aviseras före en viss tidsfrist.",
          "Du är ensam ansvarig för att hålla reda på dina egna förnyelsedatum, föra dina egna oberoende register, verifiera utgångsinformation direkt med din registrar, och förnya dina domäner i tid. Förlita dig inte på DomainLert som ditt enda skydd mot att en domän förfaller.",
        ],
      },
      {
        heading: "Påminnelser och e-post",
        body: [
          "Du kan konfigurera påminnelsetrösklar som standard och per domän samt upp till tre egna mottagare per domän. Du ansvarar för att ha tillstånd att uppge dessa adresser och för att hålla dem aktuella.",
          "Vi garanterar inte att någon påminnelse skickas, levereras, levereras i tid eller ses. Leverans av påminnelser beror på faktorer utanför vår kontroll, inklusive e-postleverantörer, skräppostfilter, DNS, nätverksförhållanden, avbrott och riktigheten i den information som du och tredjepartskällor lämnar. En utebliven påminnelse betyder inte att en domän är säker.",
        ],
      },
      {
        heading: "Tidig access och ändringar av tjänsten",
        body: [
          "DomainLert erbjuds för närvarande under en period av tidig access. Funktioner kan ändras, tillkomma eller tas bort; tjänsten kan pausas för underhåll; och beteendet kan skilja sig från vad som beskrivs på webbplatsen. Vi kan ändra, stänga av, begränsa eller upphöra med tjänsten, eller någon del av den, när som helst. Där det är rimligt kommer vi att meddela väsentliga ändringar.",
        ],
      },
      {
        heading: "Betalningar och uppsägning",
        body: [
          "DomainLert är för närvarande gratis under tidig access, och ingen betalning tas ut. Om vi inför betalplaner förnyas de enligt de plandetaljer som visas i kassan, du kan säga upp för att stoppa framtida förnyelser, och eventuell rätt till återbetalning styrs av erbjudandet som visas när du tecknar dig.",
        ],
      },
      {
        heading: "Inga garantier",
        body: [
          "I den utsträckning lagen tillåter tillhandahålls DomainLert ”i befintligt skick” och ”i mån av tillgång”, utan garantier av något slag, vare sig uttryckliga eller underförstådda. Vi garanterar inte att tjänsten kommer att vara oavbruten, snabb, säker eller felfri, att något utgångsdatum eller någon status som visas är korrekt eller fullständig, att påminnelser kommer att levereras, eller att tjänsten kommer att uppfylla dina krav. All information som DomainLert tillhandahåller är endast för allmän vägledning och utgör inte professionell, juridisk eller ekonomisk rådgivning.",
        ],
      },
      {
        heading: "Ansvarsbegränsning",
        body: [
          "I den utsträckning lagen tillåter ansvarar DomainLert inte för:",
          "- någon domän som går ut, förfaller, inte förnyas, stängs av eller går förlorad, eller för någon åtgärd eller underlåtenhet från en registrar eller ett register;",
          "- någon påminnelse som är fördröjd, felaktig, ofullständig eller inte levererad;",
          "- felaktiga, fördröjda eller saknade data från RDAP, WHOIS eller andra tredjepartskällor;",
          "- något avbrott, driftstopp eller upphörande av tjänsten;",
          "- förlust av vinst, intäkter, affärer, avtal, möjligheter, goodwill, data eller förväntade besparingar; eller",
          "- någon indirekt, tillfällig, särskild eller följdskada, eller skadestånd i bestraffande syfte.",
          "Vårt totala sammanlagda ansvar som uppstår ur eller i samband med tjänsten eller dessa villkor kommer inte att överstiga det högre av (a) de belopp du betalat oss för tjänsten under de tolv månaderna före den händelse som gav upphov till anspråket, eller (b) 100 USD. Eftersom tjänsten för närvarande tillhandahålls utan kostnad, och dess pris återspeglar denna riskfördelning, gäller denna gräns fullt ut.",
          "Inget i dessa villkor utesluter eller begränsar vårt ansvar där det skulle vara olagligt att göra så, inklusive ansvar för dödsfall eller personskada orsakad av vårdslöshet, för bedrägeri eller bedräglig vilseledning, eller för något ansvar som inte kan uteslutas eller begränsas enligt tvingande svensk eller EU-rättslig lagstiftning. Om du använder DomainLert som konsument påverkas inte dina tvingande lagstadgade rättigheter av dessa villkor, och vissa av undantagen och begränsningarna ovan kanske inte gäller för dig.",
        ],
      },
      {
        heading: "Ditt ansvar och skadeslöshet",
        body: [
          "Du ansvarar för din användning av DomainLert, domänerna du bevakar och mottagaradresserna du lägger till. I den utsträckning lagen tillåter, och utom där du använder tjänsten som konsument, samtycker du till att ersätta oss för skäliga anspråk, förluster och kostnader som uppstår till följd av ditt brott mot dessa villkor, ditt missbruk av tjänsten, eller ditt intrång i en annan parts rättigheter.",
        ],
      },
      {
        heading: "Tredjepartstjänster",
        body: [
          "DomainLert är beroende av tredje part, inklusive domändatakällor såsom RDAP- och WHOIS-servrar, e-postleverantörer, hosting, samt leverantörer av autentisering och databas. Vi ansvarar inte för dessa tredje parters handlingar, underlåtenheter, tillgänglighet eller riktighet, och deras egna villkor och policyer kan också gälla för din användning.",
        ],
      },
      {
        heading: "Avstängning och uppsägning",
        body: [
          "Vi kan stänga av eller avsluta ditt konto om du bryter mot dessa villkor, om din användning skapar risk eller rättslig exponering, eller om vi är skyldiga att göra det enligt lag. Du kan sluta använda DomainLert och avsluta ditt konto när som helst. Avsnitt som till sin natur bör överleva uppsägning — inklusive friskrivningarna, ansvarsbegränsningen, skadeslösheten och lagvalet — fortsätter att gälla efteråt.",
        ],
      },
      {
        heading: "Händelser utanför vår kontroll",
        body: [
          "Vi ansvarar inte för någon underlåtenhet eller försening i att tillhandahålla tjänsten som orsakas av händelser utanför vår rimliga kontroll, inklusive avbrott eller förändringar hos register, registrarer, hosting- eller e-postleverantörer, nätverksfel, cyberattacker eller myndighetsåtgärder.",
        ],
      },
      {
        heading: "Tillämplig lag och tvister",
        body: [
          "Dessa villkor, och varje tvist som uppstår ur eller i samband med dem eller med tjänsten, regleras av svensk lag, utan hänsyn till dess lagvalsregler. Svensk domstol har jurisdiktion, förutom att, om du använder DomainLert som konsument, tvingande lag ändå kan tillåta dig att väcka talan i det land där du bor och att åberopa det landets konsumentskyddsregler. Innan du inleder ett formellt förfarande ber vi dig att kontakta oss via vår [kontaktsida](/contact) så att vi kan försöka lösa saken direkt.",
        ],
      },
      {
        heading: "Allmänt",
        body: [
          "Om någon bestämmelse i dessa villkor bedöms ogiltig gäller övriga fortsatt. Att vi inte tillämpar en bestämmelse innebär inte att vi avstår från den. Du får inte överlåta dina rättigheter enligt dessa villkor utan vårt samtycke; vi får överlåta våra till en efterträdare av tjänsten. Dessa villkor, tillsammans med vår [integritetspolicy](/privacy), utgör hela avtalet mellan dig och oss om tjänsten.",
        ],
      },
      {
        heading: "Ändringar och kontakt",
        body: [
          "Vi kan uppdatera dessa villkor när tjänsten förändras. Om en ändring är väsentlig vidtar vi rimliga åtgärder för att meddela dig; fortsatt användning efter en uppdatering innebär att du godkänner de reviderade villkoren. Frågor om dessa villkor kan ställas via vår [kontaktsida](/contact).",
        ],
      },
    ],
  },

  auth: {
    common: {
      emailLabel: "E-postadress",
      passwordLabel: "Lösenord",
      newPasswordLabel: "Nytt lösenord",
      confirmPasswordLabel: "Bekräfta nytt lösenord",
      pleaseWait: "Vänta …",
      backToLogin: "Tillbaka till inloggning",
    },
    login: {
      meta: {
        title: "Logga in",
        description:
          "Logga in på ditt DomainLert-konto för att se dina bevakade domäner och kommande utgångspåminnelser.",
      },
      kicker: "Välkommen tillbaka",
      title: "Håll koll.",
      intro: "Logga in för att se dina bevakade domäner och nästa datum som behöver uppmärksamhet.",
      submit: "Logga in",
      pending: "Loggar in dig. Vänta …",
      forgot: "Glömt lösenordet?",
      switchPrompt: "Ny på DomainLert?",
      switchAction: "Skapa ett konto",
      asideTag: "DOMAINLERT / 01",
      asideLine1: "Vet innan",
      asideEm: "du måste veta.",
    },
    signup: {
      meta: {
        title: "Skapa konto",
        description:
          "Skapa ett DomainLert-konto och börja bevaka dina domäner — gratis medan DomainLert är i tidig access.",
      },
      kicker: "Börja bevaka",
      title: "Gör förnyelser tråkiga.",
      intro: "Skapa ditt konto och få en tydlig bild av varje domän innan tiden blir knapp.",
      submit: "Skapa konto",
      pending: "Skapar ditt konto. Vänta …",
      switchPrompt: "Har du redan ett konto?",
      switchAction: "Logga in",
      asideTag: "DOMAINLERT / 01",
      asideLine1: "Vet innan",
      asideEm: "du måste veta.",
    },
    forgot: {
      meta: {
        title: "Återställ ditt lösenord",
        description: "Begär en återställningslänk för lösenordet till ditt DomainLert-konto.",
      },
      kicker: "Kontoåtkomst",
      title: "Återställ ditt lösenord.",
      intro:
        "Ange din kontos e-postadress så skickar vi en säker länk där du kan välja ett nytt lösenord.",
      submit: "Skicka återställningslänk",
      pending: "Skickar återställningslänk. Vänta …",
      asideTag: "DOMAINLERT / 02",
      asideLine1: "Tillbaka till",
      asideEm: "det som betyder något.",
    },
    reset: {
      meta: {
        title: "Välj ett nytt lösenord",
        description: "Välj ett nytt lösenord för ditt DomainLert-konto.",
      },
      kicker: "Kontoåtkomst",
      title: "Välj ett nytt lösenord.",
      intro: "Använd minst åtta tecken och bekräfta sedan ditt nya lösenord nedan.",
      submit: "Uppdatera lösenord",
      pending: "Uppdaterar lösenord. Vänta …",
      asideTag: "DOMAINLERT / 03",
      asideLine1: "Håll koll",
      asideEm: "med trygghet.",
    },
    errors: {
      enterEmailAndPassword: "Ange din e-post och ditt lösenord.",
      credentialsRejected: "Den kombinationen av e-post och lösenord godtogs inte.",
      enterValidEmail: "Ange en giltig e-postadress.",
      resetSendFailed: "Vi kunde inte skicka återställningsmejlet. Försök igen.",
      resetEmailSent: "Kolla din inkorg efter en länk för att återställa lösenordet.",
      passwordTooShort: "Använd ett lösenord med minst 8 tecken.",
      passwordsDoNotMatch: "Dina lösenord stämmer inte överens.",
      resetLinkExpired: "Den återställningslänken har gått ut. Begär en ny för att fortsätta.",
      passwordUpdateFailed: "Vi kunde inte uppdatera ditt lösenord. Försök igen.",
      passwordUpdated: "Ditt lösenord har uppdaterats. Du kan nu logga in.",
      signupInvalid: "Använd en e-postadress och ett lösenord med minst 8 tecken.",
      confirmEmail: "Kolla din e-post för att bekräfta ditt konto.",
    },
  },

  dashboard: {
    meta: { title: "Panel" },
    eyebrow: "Domänbevakning",
    title: "Bevakade domäner",
    monitoringActive: "● BEVAKNING AKTIV",
    domainsLabel: "Bevakade domäner / {count} domäner",
    goodMorning: "God morgon",
    goodMorningName: "God morgon, {name}",
    domainsHealthy: "domäner friska",
    needAttention: { one: "{count} domän behöver åtgärdas", other: "{count} domäner behöver åtgärdas" },
    import: {
      kicker: "Lägg till i bevakade domäner",
      title: "Ta med din lista.",
      text: "Klistra in domäner åtskilda med kommatecken, mellanslag eller radbrytningar. Vi tar bort dubbletter och håller din lista privat.",
      label: "Domänlista",
      submit: "Importera domäner",
    },
    alerts: {
      kicker: "Utgångspåminnelser",
      title: "Ange din standard.",
      text: "Antal dagar före utgång då vi ska mejla dig, åtskilda med kommatecken. Varje domän kan åsidosätta detta via sin Påminnelser-knapp ovan.",
      label: "Antal dagar före utgång",
      submit: "Spara standard",
    },
    logOut: "Logga ut",
    loadingDomains: "Laddar dina domäner",
    list: {
      searchLabel: "Sök domäner",
      searchPlaceholder: "Hitta en domän",
      sortLabel: "Sortera efter",
      sortAz: "A–Ö",
      sortZa: "Ö–A",
      sortActive: "Aktiva",
      perPageLabel: "Visa per sida",
      headerDomain: "Domän",
      headerExpiry: "Utgång",
      headerStatus: "Status",
      headerAlerts: "Påminnelseschema",
      headerActions: "Åtgärder",
      notRegistered: "Ej registrerad",
      expiryPending: "Väntar på kontroll",
      customThresholds: "Egna: {values}",
      defaultThresholds: "Standardtrösklar",
      emptySearch: "Inga domäner matchar din sökning.",
      emptyList: "Dina första domäner visas här.",
      paginationRange: "{from}–{to} av {total}",
      previous: "Föregående",
      next: "Nästa",
      previousPage: "Föregående sida",
      nextPage: "Nästa sida",
      pageXofY: "Sida {page} av {pages}",
      status: {
        active: "aktiv",
        expiring_soon: "går snart ut",
        expired: "utgången",
        check_failed: "kontroll misslyckades",
        not_registered: "ej registrerad",
      },
    },
    deleteDialog: {
      trigger: "Ta bort",
      kicker: "Ta bort domän",
      title: "Ta bort {name}?",
      body: "Detta tar bort domänen och dess bevakningshistorik från ditt konto.",
      cancel: "Avbryt",
      confirm: "Ta bort domän",
      pending: "Tar bort …",
    },
    alertsDialog: {
      trigger: "Påminnelser",
      kicker: "Utgångspåminnelser",
      thresholdsHelp:
        "Lägg till upp till 5 egna trösklar, åtskilda med kommatecken. Lämna tomt för att använda din standard ({defaults}).",
      recipientHint:
        "Lägg till upp till 3 egna e-postmottagare för den här domänen, åtskilda med kommatecken. Lämna tomt för att avisera din kontos e-postadress.",
      recipientPlaceholder: "E-postmottagare (upp till 3)",
      thresholdError: "Använd högst 5 egna trösklar.",
      cancel: "Avbryt",
      save: "Spara",
      pending: "Sparar …",
    },
    actions: {
      listTooLong: "Ange en domänlista på högst 100 000 tecken.",
      enterOneValid: "Ange minst en giltig domän.",
      capReached: "Ditt konto har nått taket på 1 000 domäner. Kontakta supporten för att lägga till fler.",
      importFailed: "Vi kunde inte importera de domänerna. Kontrollera din databasuppsättning och försök igen.",
      imported: { one: "Importerade {count} domän", other: "Importerade {count} domäner" },
      importedSkipped: "; hoppade över {skipped}.",
      importedDone: ".",
      couldNotIdentify: "Vi kunde inte identifiera den domänen.",
      removeFailed: "Vi kunde inte ta bort den domänen. Försök igen.",
      removed: "Domänen togs bort.",
      defaultThresholdsFailed:
        "Vi kunde inte uppdatera dina standardtrösklar för påminnelser. Försök igen.",
      defaultThresholdsUpdated: "Dina standardtrösklar för påminnelser har uppdaterats.",
      thresholdsTooLong: "Håll påminnelsetrösklarna till högst 1 000 tecken.",
      recipientsTooLong: "Håll e-postmottagarna till högst 2 000 tecken.",
      invalidRecipients: "Ange giltiga e-postadresser, åtskilda med kommatecken.",
      tooManyRecipients: "Använd högst 3 e-postadresser per domän.",
      domainAlertsFailed: "Vi kunde inte uppdatera påminnelserna för den domänen. Försök igen.",
      domainUsesDefault: "{name} använder nu dina standardtrösklar för påminnelser.",
      domainCustomSaved: "Egna påminnelsetrösklar sparade för {name}.",
    },
    thresholdValidation: {
      atLeastOne: "Ange minst en giltig dagströskel (1–365), åtskilda med kommatecken.",
      wholeNumbers: "Använd heltalströsklar från 1 till 365, åtskilda med kommatecken.",
      wholeNumbersOrBlank:
        "Använd heltalströsklar från 1 till 365, åtskilda med kommatecken, eller lämna tomt för att använda din standard.",
      tooMany: "Använd högst {max} trösklar.",
      tooManyOrBlank: "Använd högst {max} trösklar, eller lämna tomt för att använda din standard.",
    },
  },

  profile: {
    kicker: "Kontoinställningar",
    title: "Din profil.",
    backToDashboard: "Tillbaka till panelen",
    loading: "Laddar din profil",
    details: {
      number: "01",
      title: "Profiluppgifter",
      text: "Håll dina kontaktuppgifter och byråuppgifter aktuella.",
      name: "Namn",
      role: "Roll",
      rolePlaceholder: "Kundansvarig",
      agency: "Byråns namn",
      agencyPlaceholder: "Northstar Studio",
      phone: "Telefonnummer",
      phonePlaceholder: "+46 70 123 45 67",
      website: "Webbplats",
      websitePlaceholder: "https://northstar.studio",
      submit: "Spara profil",
    },
    email: {
      number: "02",
      title: "E-postadress",
      text: "Vi skickar en bekräftelselänk innan din inloggningsadress ändras.",
      label: "E-postadress",
      submit: "Uppdatera e-post",
    },
    password: {
      number: "03",
      title: "Lösenord",
      text: "Välj ett nytt lösenord med minst 8 tecken.",
      current: "Nuvarande lösenord",
      new: "Nytt lösenord",
      confirm: "Bekräfta nytt lösenord",
      submit: "Byt lösenord",
    },
    testEmail: {
      number: "04",
      title: "Testa e-postleverans",
      text: "Skicka en exempelpåminnelse om utgång till dig själv för att bekräfta att SMTP är korrekt konfigurerat och se hur mejlet ser ut.",
      note: "Skickar en fingerad påminnelse ”example.com går ut om 14 dagar” till {email}.",
      submit: "Skicka testmejl",
    },
    actions: {
      namesTooLong: "Håll namn, roller och byrånamn till högst 120 tecken.",
      phoneTooLong: "Håll ditt telefonnummer till högst 30 tecken.",
      invalidWebsite: "Ange en fullständig webbadress, inklusive https://.",
      profileFailed: "Vi kunde inte uppdatera din profil. Försök igen.",
      profileUpdated: "Din profil har uppdaterats.",
      enterValidEmail: "Ange en giltig e-postadress.",
      sameEmail: "Det är redan din nuvarande e-postadress.",
      confirmNewEmail: "Kolla din inkorg för att bekräfta din nya e-postadress.",
      enterCurrentPassword: "Ange ditt nuvarande lösenord.",
      passwordTooShort: "Använd ett lösenord med minst 8 tecken.",
      passwordsDoNotMatch: "Dina nya lösenord stämmer inte överens.",
      noPasswordEmail: "Det här kontot har ingen e-postadress för lösenord.",
      currentPasswordRejected: "Ditt nuvarande lösenord godtogs inte.",
      passwordChanged: "Ditt lösenord har ändrats.",
      noEmailToSend: "Ditt konto har ingen e-postadress att skicka till.",
      testEmailFailed: "Vi kunde inte skicka ett testmejl: {error}",
      testEmailSent: "Testmejl skickat till {email}. Kolla din inkorg (och skräppostmappen).",
    },
  },

  notFound: {
    eyebrow: "404",
    title: "Sidan hittades inte.",
    text: "Sidan du letade efter finns inte, eller kan ha flyttat.",
    back: "Till startsidan",
  },

  error: {
    eyebrow: "Något gick fel",
    title: "Det gick inte att ladda.",
    text: "Ett oväntat fel avbröt den här sidan. Ditt konto och dina domäner påverkas inte — försök igen, eller gå tillbaka till startsidan.",
    tryAgain: "Försök igen",
    back: "Till startsidan",
  },

  email: {
    daySingular: "1 dag",
    dayPlural: "{count} dagar",
    subject: "DomainLert: {domain} går ut om {dayLabel}",
    eyebrow: "Utgångspåminnelse",
    heading: "{domain} går ut om {dayLabel}",
    textTitle: "DomainLert-påminnelse: {domain} går ut om {dayLabel}",
    textBody: "{domain} är inställd på att gå ut den {date} (om {dayLabel}). Förnya den snart för att undvika ett avbrott.",
    textDashboard: "Öppna din panel: {url}",
    htmlBody:
      "Den här domänen är inställd på att gå ut den <strong>{date}</strong>. Förnya den snart för att undvika ett avbrott i tjänsten.",
    viewDashboard: "Öppna din panel",
    ownerFallback: "din DomainLert-kontoägare",
    footer:
      "Den här påminnelsen skapades i DomainLert av {owner}. För att ändra hur påminnelserna skickas, eller för att sluta få dem, kontakta {owner} direkt.",
  },
};

export default sv;
