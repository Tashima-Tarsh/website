import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const today = "2026-06-29";
const site = "https://thenitishkr.in";
const publisher = "THENITISHKR INDIA | RESEARCH - EVIDENCE - INTELLIGENCE";

const nav = [
  ["/disha/origin/", "Origin", "Chronology and source record"],
  ["/disha/methodology/", "Methodology", "Signal to accountable record"],
  ["/disha/cognitive-engine/", "Cognitive Engine", "Seven-stage decision cycle"],
  ["/disha/claim-to-source-system/", "Claim-to-Source", "Claims kept beside evidence"],
  ["/disha/no-first-use-policy/", "No-First-Use", "Defensive action boundary"],
  ["/disha/vyuha-defense-engine/", "Yudh & Vyuha", "Threat shape and defence"],
  ["/disha/validation/", "Validation", "Consistency and limits"],
  ["/disha/nyaya/", "NYAYA", "Legal intelligence layer"],
  ["/disha/setu-varuna/", "VARUNA x SETU", "Environment and infrastructure"],
  ["/disha/research-lineage/", "Research Lineage", "Disciplines behind DISHA"],
];

const pages = {
  "/disha/": {
    title: "DISHA Version 6.6 | Evidence-First Architecture",
    description: "DISHA Version 6.6 is an evidence-first public intelligence architecture linking signals, evidence, memory, defence, source discipline and accountability.",
    h1: "DISHA Version 6.6",
    subtitle: "Evidence-first intelligence architecture for public records, defensive intelligence, memory, and accountability.",
    image: "disha-version-6-6-architecture",
    imagePath: "/assets/images/disha-version-4.webp",
    alt: "DISHA Version 6.6 architecture diagram showing signals transformed into evidence, memory, intelligence, and accountability across six public layers.",
    caption: "DISHA Version 6.6 public architecture: signal, evidence, memory, intelligence and accountability.",
    type: "AboutPage",
    direct: "DISHA is an evidence-first public intelligence architecture created by Nitish Kumar. It turns raw signals into classified evidence, preserves that evidence as memory, analyzes it through intelligence layers, and keeps every conclusion tied to public accountability. It is not a chatbot, not only a dashboard, and not a loose archive.",
    facts: {
      Subject: "DISHA public intelligence architecture",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Evidence, memory, defensive intelligence and public accountability",
      "Evidence type": "Public architecture record, source-linked explanation and research method",
      "Related pages": "Origin, methodology, claim-to-source, validation and specialised DISHA layers"
    },
    sections: [
      ["What DISHA Is", [
        "DISHA begins with a strict distinction: a signal is not yet truth. A signal may be a document, complaint, cyber indicator, public dataset, audit line, court filing, image, letter, institutional reply, sensor event or unresolved contradiction. The architecture asks what the signal is, where it came from, who created it, how strong it is, and what public consequence may follow from treating it as reliable.",
        "That discipline matters because public harm often appears in fragments. One record stays in one department. One technical trace stays inside one system. One grievance is closed without relief. One audit paragraph is buried in a PDF. DISHA exists to keep those fragments from disappearing before they can be examined."
      ]],
      ["Current v6.6 Runtime", [
        "The current public version is best understood as a small runtime path: every mission becomes a signal, every signal is classified, every finding keeps its source, and every high-risk action remains policy-gated. This is the technical truth of Version 6.6. It belongs on the public page as a compact operating map, not as a giant wall of internal detail."
      ], "runtime"],
      ["Public Evidence Chain", [
        "The public chain is simple: signal, evidence, memory, intelligence, accountability. DISHA does not ask readers to trust a conclusion because it is confidently written. It preserves the record behind the decision so a reader, researcher, journalist, court-facing reviewer or public institution can examine the basis for the claim."
      ], "chain"],
      ["Authority Signals and Research Lineage", [
        "The documented research trail includes GIS Capacity in the Government Sector and Geo-spatial Data Structure for Explosive Detection, along with signal studies, public-sector systems, cyber evidence, rescue-management research and constitutional accountability. Prof. Dr. Meenakshi Sharma is identified in the repository record as a research adviser connected to the early GIS and geospatial research context.",
        "These references do not mean government adoption of DISHA. They establish research context and lineage. The public page must keep that line clear."
      ], "research-lineage"],
      ["What This Page Does Not Claim", [
        "This page does not claim court validation, government adoption, commercial certification, classified access, or complete publication of protected implementation details. It presents a public architecture record and links readers to deeper pages where each concept is examined with its own boundary."
      ]]
    ],
    faqs: [
      ["Is DISHA an AI chatbot?", "No. A conversational interface can sit above DISHA, but DISHA itself is an evidence-first intelligence architecture."],
      ["What is DISHA Version 6.6?", "Version 6.6 is the public architecture record connecting evidence method, memory, cognitive cycle, defensive doctrine, validation and claim-to-source discipline."],
      ["What makes DISHA different?", "DISHA keeps conclusions tied to sources. It does not turn unsupported information into final truth."],
      ["What is the central line of DISHA?", "A citizen who cannot be remembered cannot be protected."]
    ],
    cta: ["Explore the DISHA architecture", "/disha/methodology/", "Read the method that turns signals into accountable records."]
  },
  "/disha/methodology/": {
    title: "DISHA Methodology | Evidence Chain",
    description: "The DISHA methodology explains how signals become evidence, evidence becomes memory, and intelligence remains tied to accountable public records.",
    h1: "DISHA Methodology",
    subtitle: "How a signal becomes an accountable public record.",
    image: "disha-public-evidence-chain",
    alt: "DISHA methodology diagram showing signal, evidence, memory, intelligence, and accountability as a public evidence chain.",
    caption: "The five-stage public evidence chain used by the DISHA methodology.",
    type: "TechArticle",
    direct: "The DISHA methodology explains how raw signals become evidence, evidence becomes memory, memory becomes intelligence, and intelligence becomes an accountable public record. It begins with source material and ends with a finding that can be reviewed, corrected, challenged or supported.",
    facts: {
      Subject: "DISHA evidence methodology",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Prevent unsupported claims from becoming public consequence",
      "Evidence type": "Method explanation and evidence classification",
      "Related pages": "Claim-to-source, validation and DISHA architecture"
    },
    sections: [
      ["Signal", ["A signal is any input that may matter to a public-interest question. It may be a government letter, court filing, RTI reply, audit report, grievance record, media report, open dataset, cyber indicator, citizen testimony or telemetry event. At this stage it is not yet evidence."]],
      ["Evidence", ["A signal becomes evidence only when it is labelled properly. DISHA separates official records, corroborated records, documented allegations, DISHA assessments and unresolved questions. That separation prevents an uncertain claim from becoming stronger than the source behind it."]],
      ["Memory", ["Evidence becomes memory when it is preserved with date, source trail, evidence class, relationship to other records and current status. Memory is not storage. It is the structure that lets a later reader reconstruct how a conclusion was formed."]],
      ["Intelligence and Accountability", ["Intelligence appears when preserved evidence is compared across time, institutions, documents, systems and people. A finding becomes accountable only when its source remains visible and its reasoning can be examined."]],
      ["What This Page Does Not Claim", ["This page does not claim that every DISHA assessment is final fact. It describes the method for classifying, preserving and reviewing material without collapsing all source types into one level of certainty."]]
    ],
    faqs: [
      ["Why does DISHA start with signals?", "Because raw information can be useful without yet being reliable. The method begins by identifying what the input is."],
      ["Is an allegation treated as evidence?", "A documented allegation can be recorded, but it must remain labelled as an allegation unless stronger source material supports it."],
      ["Why does memory matter?", "Memory keeps the source trail, status and context alive after the first reading of a record."],
      ["How does the method prevent overclaiming?", "It keeps source class, uncertainty and limitation visible beside the finding."]
    ],
    cta: ["Follow the evidence chain", "/disha/claim-to-source-system/", "Open the claim-to-source system."]
  },
  "/disha/cognitive-engine/": {
    title: "The DISHA Cognitive Engine",
    description: "The DISHA cognitive engine uses seven stages to keep intelligence tied to evidence, memory, deliberation, policy and human review.",
    h1: "The DISHA Cognitive Engine",
    subtitle: "The seven-stage decision cycle.",
    image: "disha-cognitive-engine",
    alt: "Seven-stage DISHA cognitive engine showing perceive, attend, reason, deliberate, act, reflect, and consolidate.",
    caption: "The seven-stage cycle: perceive, attend, reason, deliberate, act, reflect and consolidate.",
    type: "TechArticle",
    direct: "The DISHA cognitive engine is a seven-stage cycle that prevents machine output from becoming an instant decision. It moves through perception, attention, reasoning, deliberation, bounded action, reflection and consolidation so every conclusion remains connected to evidence, policy, memory and human review.",
    facts: {
      Subject: "DISHA cognitive engine",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Slow down decisions until evidence, alternatives and policy boundaries are visible",
      "Evidence type": "Public decision-cycle explanation",
      "Related pages": "No-First-Use, methodology and validation"
    },
    sections: [
      ["Why the Pause Matters", ["A weak system answers too quickly. A serious system pauses. DISHA is built around that pause because public consequence should not follow a model output, alert or inference before the record has been checked."]],
      ["Seven Stages", ["Perceive identifies signals, entities, constraints and uncertainty. Attend retrieves relevant memory. Reason develops hypotheses. Deliberate tests alternatives. Act proposes bounded action subject to authority. Reflect compares expected and actual outcomes. Consolidate keeps only learning strong enough to become durable memory."]],
      ["Human Authority", ["The cognitive engine does not remove human judgment. It creates a record around the point where human judgment is needed most: before irreversible consequence, public accusation, system restriction or formal escalation."]],
      ["What This Page Does Not Claim", ["This page does not disclose protected internals or claim that every internal mechanism is public. It explains the public decision cycle and its accountability purpose."]]
    ],
    faqs: [
      ["Why seven stages?", "The stages separate observation, memory, reasoning, choice, action, review and learning so they do not collapse into one step."],
      ["Is action automatic?", "No high-risk action should bypass policy control and human review."],
      ["What is consolidation?", "Consolidation is the step where validated learning may enter durable memory while weak material is rejected."],
      ["Can the cycle be audited?", "The public purpose is to make reasoning and evidence status reviewable."]
    ],
    cta: ["Study the decision cycle", "/disha/no-first-use-policy/", "See how policy controls action."]
  },
  "/disha/claim-to-source-system/": {
    title: "DISHA Claim-to-Source System",
    description: "The DISHA claim-to-source system links each important claim to source, evidence class, case file, verification date and status.",
    h1: "DISHA Claim-to-Source System",
    subtitle: "The source remains beside the claim.",
    image: "disha-claim-to-source-system",
    alt: "DISHA claim-to-source system showing claim ID, exact claim text, direct source, evidence class, related case file, verification date, and current status.",
    caption: "A claim stays reviewable when its source, class, date and status remain beside it.",
    type: "Dataset",
    direct: "The DISHA claim-to-source system is a live evidentiary discipline that connects each important claim to its direct source, evidence class, case file, verification date and current status. It prevents claims from drifting away from the records that support, limit or challenge them.",
    facts: {
      Subject: "Claim-to-source discipline",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Keep public claims reviewable",
      "Evidence type": "Claim ledger structure and source-status method",
      "Related pages": "Methodology, validation and intelligence archive"
    },
    sections: [
      ["Why Claims Need Sources", ["A claim without a source is only a statement. A claim with a source can be examined. DISHA is built on that difference because public accountability fails when conclusions become detached from documents."]],
      ["Claim Record Fields", ["A DISHA claim record should identify claim ID, exact claim text, direct source URL, related case file, evidence class, verification date and current status. The field names are not decoration. They are the minimum structure needed for review."]],
      ["Evidence Classes", ["The working classes are official record, corroborated record, documented allegation, DISHA assessment and unresolved question. These labels keep primary records stronger than analysis and keep unresolved material from being inflated."]],
      ["How It Works in v6.6", ["A mission is normalized into a DishaSignal, examined through selected lenses, evaluated by the policy gate, and recorded into the evidence ledger before the result is returned. On this page, the same principle appears as a visible claim ledger: claim, source, case file, class, date and status stay together."]],
      ["Indian Public-Record Relevance", ["The claim-to-source system is built for records that may come from Union ministries, state departments, district offices, urban local bodies, panchayats, courts, audit bodies, public datasets, grievance systems and RTI replies. The page does not ask the reader to accept a claim without seeing what kind of record supports it."]],
      ["Example DISHA Flow", ["Public complaint becomes source classification. The source is connected to a related government record. The record receives an evidence class. DISHA can then form an intelligence assessment, apply policy or legal checks, and preserve the result as an accountability record."]],
      ["What This Page Does Not Claim", ["This page does not claim that every public claim is already fully verified. It explains the discipline used to keep claims connected to the strongest available source and current limitation."]]
    ],
    faqs: [
      ["Why does every claim need a source?", "Because public intelligence must be reviewable by someone other than the author."],
      ["Is a DISHA assessment an official record?", "No. It is an analytical conclusion based on records and must not replace the underlying source."],
      ["What happens when a claim is unresolved?", "It remains labelled unresolved until enough source evidence exists to support or contradict it."],
      ["Can a claim status change?", "Yes. A status should change when new source material changes the evidentiary position."]
    ],
    cta: ["Open the live claim table", "/intelligence/", "Review applied public-record cases."]
  },
  "/disha/no-first-use-policy/": {
    title: "DISHA No-First-Use Cyber Doctrine",
    description: "DISHA No-First-Use allows authorised defence, evidence preservation and recovery while refusing retaliation or offensive cyber action.",
    h1: "DISHA No-First-Use Cyber Doctrine",
    subtitle: "Defend. Protect. Preserve. Never initiate.",
    image: "disha-no-first-use-policy",
    alt: "DISHA No-First-Use policy chart comparing permitted defensive actions with prohibited offensive actions.",
    caption: "The doctrine separates permitted defensive protection from prohibited offensive action.",
    type: "Article",
    direct: "The DISHA No-First-Use doctrine means the architecture may defend authorised environments, preserve evidence, isolate risk, recover systems and protect public-interest records. It does not initiate offensive cyber action, hacking back, malware deployment, credential theft, unauthorised scanning or retaliation against external systems.",
    facts: {
      Subject: "DISHA cyber doctrine",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Define the lawful defensive boundary",
      "Evidence type": "Policy boundary statement",
      "Related pages": "Yudh & Vyuha, cognitive engine and methodology"
    },
    sections: [
      ["Permitted Defence", ["Permitted defensive actions may include blocking hostile inbound activity, restricting untrusted outbound activity, rate limiting abusive traffic, isolating compromised devices, quarantining suspicious files, revoking risky sessions, rotating keys, preserving evidence and recovering from a trusted state."]],
      ["Prohibited Offensive Actions", ["The doctrine refuses hacking back, external exploitation, credential theft, malware deployment, unauthorised scanning, destructive retaliation, disruption of third parties and self-propagating behaviour. Defence cannot become the reason to attack."]],
      ["Human Authority", ["A defensive system may identify risk, preserve material and propose action. Irreversible consequence belongs behind policy, authority and human review."]],
      ["What This Page Does Not Claim", ["This page does not publish attack methods, exploit paths, credentials or restricted control logic. It states the public boundary: defensive protection without retaliation."]]
    ],
    faqs: [
      ["Does DISHA hack back?", "No. The doctrine rejects retaliation and unauthorised external action."],
      ["Can DISHA isolate risk?", "Only within authorised defensive environments and subject to the policy boundary."],
      ["Why preserve evidence?", "Evidence preservation allows later review, correction, reporting or lawful escalation."],
      ["Is this legal advice?", "No. It is a public doctrine statement and must remain subject to applicable law and authority."]
    ],
    cta: ["Read the defensive doctrine", "/disha/vyuha-defense-engine/", "Explore Yudh and Vyuha formations."]
  },
  "/disha/vyuha-defense-engine/": {
    title: "Yudh & Vyuha Defense Engine",
    description: "Yudh reads threat structure and Vyuha shapes DISHA defensive formations for protection, evidence, containment and recovery.",
    h1: "Yudh & Vyuha Defense Engine",
    subtitle: "Yudh reads the threat. Vyuha shapes the defence.",
    image: "disha-yudh-vyuha-defense-engine",
    alt: "DISHA Yudh and Vyuha defense engine diagram showing threat assessment translated into defensive formations.",
    caption: "Threat assessment is translated into defensive formation, evidence preservation and recovery.",
    type: "TechArticle",
    direct: "Yudh and Vyuha form DISHA's defensive cyber intelligence model. Yudh studies the shape, source, behaviour and risk of a threat. Vyuha selects a defensive formation that protects authorised systems, preserves evidence, limits harm, supports recovery and remains subject to No-First-Use restraint.",
    facts: {
      Subject: "Yudh and Vyuha defensive intelligence",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Turn threat shape into bounded defence",
      "Evidence type": "Defensive architecture explanation",
      "Related pages": "No-First-Use, cognitive engine and validation"
    },
    sections: [
      ["Yudh", ["Yudh names the conflict posture. It asks what is happening, which system is affected, what behaviour is visible, which evidence should be preserved and what level of authority is needed before action."]],
      ["Vyuha", ["Vyuha gives the defence its shape. A formation is not a dramatic response. It is a bounded arrangement of observation, preservation, isolation, protection, recovery and review."]],
      ["Five Formations", ["Trishula covers identity, network and filesystem defence. Kurma reduces exposure. Padma supports segmentation and controlled isolation. Garbha protects inner evidence and recovery. Nakshatra Mandala correlates weak signals across time and systems."]],
      ["What This Page Does Not Claim", ["This page does not publish exploit methods, attack instructions, credentials, protected internals or restricted control logic. It explains defensive architecture and public doctrine."]]
    ],
    faqs: [
      ["What does Yudh mean here?", "It means structured threat reading, not a permission to escalate."],
      ["What is a Vyuha?", "A bounded defensive formation selected after evidence, duty, risk and authority are examined."],
      ["Are formations offensive?", "No. They are defensive and constrained by the No-First-Use doctrine."],
      ["Why use formations?", "A defensive event often requires several coordinated controls, not one isolated rule."]
    ],
    cta: ["Explore the Vyuha formations", "/disha/no-first-use-policy/", "Review the No-First-Use boundary."]
  },
  "/disha/origin/": {
    title: "DISHA Origin Record | thenitishkr",
    description: "The DISHA origin record traces the 2012 foundation sketch, 2013 institutional correspondence and Version 6.6 public architecture.",
    h1: "The Origin of DISHA",
    subtitle: "From foundation record to public architecture.",
    image: "disha-origin-timeline",
    alt: "Timeline showing DISHA's development from the 2012 foundation record to the 2013 institutional correspondence trail and Version 6.6 public architecture.",
    caption: "A conservative chronology from the foundation record to Version 6.6.",
    type: "Article",
    direct: "The DISHA origin record is based on two early source points: a foundation sketch dated 25 April 2012 and a 2013 Bihar Council of Science and Technology correspondence record. These records support chronology and research context. They do not, by themselves, prove every present capability, deployment or validation claim.",
    facts: {
      Subject: "DISHA origin chronology",
      Version: "Version 6.6 public record",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Place the architecture in source chronology without overclaiming",
      "Evidence type": "Foundation sketch, development record and institutional correspondence",
      "Related pages": "Methodology, validation and research lineage"
    },
    sections: [
      ["Where the Record Begins", ["DISHA did not begin as a chatbot product. It began as a record. The first visible form was handwritten, with the problem already present: how should signals be organised, how should evidence survive, how should intelligence remain accountable, and who should receive the result?"]],
      ["Chronology", ["25 April 2012 marks the foundation record. The 2013 correspondence adds an external institutional trail connected to research context. Later years show expansion into evidence, memory, public architecture and Version 6.6 documentation."]],
      ["What Origin Proves", ["Origin proves chronology, continuity of the research question and movement from private conception to public documentation. It helps readers see where the architecture began."]],
      ["What Origin Does Not Prove", ["Origin does not prove government adoption, full operational deployment, judicial approval or every later capability. Those claims would require separate source records."]]
    ],
    faqs: [
      ["When did DISHA begin?", "The earliest foundation record is dated 25 April 2012."],
      ["What does the 2013 record establish?", "It establishes an institutional correspondence trail connected to the early research chronology."],
      ["Does origin prove adoption?", "No. It supports chronology and research context, not adoption."],
      ["Why does origin matter?", "Because it shows where the evidence, memory and accountability question began."]
    ],
    cta: ["Explore the full origin timeline", "/disha/methodology/", "Read how the method developed."]
  },
  "/disha/validation/": {
    title: "DISHA Validation Framework",
    description: "DISHA validation explains the 97 percent methodological consistency figure, finding categories, source comparison and limits.",
    h1: "DISHA Validation Framework",
    subtitle: "What the 97% consistency record means - and what it does not mean.",
    image: "disha-validation-framework",
    alt: "DISHA validation framework showing reviewed findings compared with source records and classified as consistent, partially supported, contradicted, or unresolved.",
    caption: "Reviewed findings are compared with source records and classified by support status.",
    type: "Dataset",
    direct: "The DISHA 97% figure is a methodological consistency measure. It reflects the proportion of reviewed analytical findings that remained consistent with independently available source records such as government documents, audit reports, RTI replies, court filings, official correspondence and open data. It is not a court ruling or commercial certification.",
    facts: {
      Subject: "DISHA validation method",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Explain consistency without overclaiming",
      "Evidence type": "Source comparison and finding classification",
      "Related pages": "Claim-to-source, methodology and DISHA architecture"
    },
    sections: [
      ["What Was Reviewed", ["Validation reviews analytical findings against available source records. A finding must be compared, classified and left open to correction if later source material changes the record."]],
      ["Finding Categories", ["The categories are consistent with source record, partially supported, incorrect or contradicted, and unresolved. Unresolved material should not be forced into certainty for the sake of a cleaner number."]],
      ["What 97% Means", ["The figure describes methodological consistency inside the reviewed set. It indicates how often reviewed findings remained consistent with available records used for comparison."]],
      ["What 97% Does Not Mean", ["It is not a court ruling, not a commercial certification, not a claim of perfect truth and not a claim that every DISHA conclusion is final."]]
    ],
    faqs: [
      ["Is 97% a legal finding?", "No. It is a methodological consistency figure."],
      ["What records are compared?", "Available public records such as official documents, audit reports, RTI replies, court filings and open data."],
      ["Are unresolved findings counted as proven?", "No. Unresolved findings remain outside final certainty."],
      ["Can validation change?", "Yes. Better records can support, limit, contradict or resolve earlier findings."]
    ],
    cta: ["Review the validation standard", "/disha/claim-to-source-system/", "Open the source discipline."]
  },
  "/disha/nyaya/": {
    title: "NYAYA | DISHA Legal Intelligence",
    description: "NYAYA is DISHA's legal intelligence layer mapping findings to constitutional principles, judicial records, statutes and evidence.",
    h1: "NYAYA",
    subtitle: "Law participates before action.",
    image: "disha-nyaya-legal-intelligence",
    alt: "NYAYA legal intelligence diagram showing how DISHA maps findings and actions to constitutional, judicial, regulatory, ministry, and evidence records.",
    caption: "NYAYA maps findings and actions against legal sources and public authority questions.",
    type: "Article",
    direct: "NYAYA is DISHA's constitutional and legal intelligence layer. It maps findings, actions, public authority questions and institutional responsibility against legal sources, constitutional principles, judicial records, regulations, ministry roles, evidence trails and decision history.",
    facts: {
      Subject: "NYAYA legal intelligence layer",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Keep law, authority and evidence visible before action",
      "Evidence type": "Legal mapping explanation",
      "Related pages": "Claim-to-source, methodology and Article 12"
    },
    sections: [
      ["Why NYAYA Exists", ["A system that acts first and checks law later is not accountable. NYAYA exists because law must participate before action, especially when public authority, rights, records or institutional duty are involved."]],
      ["What It Maps", ["NYAYA maps findings or actions to constitutional principle, judicial record, statutory source, regulatory source, ministry responsibility, evidence source, decision history and review status."]],
      ["Human Review", ["Legal intelligence should not replace legal judgment. It should preserve the map around a decision so a human reviewer can examine authority, duty, evidence and consequence."]],
      ["What This Page Does Not Claim", ["NYAYA does not replace courts, lawyers, regulators or statutory authority. It does not claim legal finality. It preserves legal context for review."]]
    ],
    faqs: [
      ["Is NYAYA a court?", "No. It is a legal intelligence layer for mapping sources, duties and review context."],
      ["Does NYAYA decide legality?", "No. It preserves the legal map around a finding or action."],
      ["Why include ministries?", "Because public responsibility often depends on which institution held authority."],
      ["How does NYAYA connect to DISHA?", "It keeps legal context attached to evidence, decision history and accountability."]
    ],
    cta: ["Explore NYAYA", "/article-12/", "Read the Article 12 public authority context."]
  },
  "/disha/setu-varuna/": {
    title: "VARUNA x SETU | DISHA Risk Method",
    description: "VARUNA and SETU connect environmental signals with infrastructure exposure, resilience analysis and public risk recommendations.",
    h1: "VARUNA x SETU",
    subtitle: "The Scientific Handshake between environmental risk and infrastructure resilience.",
    image: "disha-varuna-setu-scientific-handshake",
    alt: "DISHA Scientific Handshake diagram showing VARUNA environmental signals connected to SETU infrastructure risk analysis.",
    caption: "Environmental signal meets infrastructure exposure through the VARUNA and SETU handshake.",
    type: "TechArticle",
    direct: "VARUNA and SETU are DISHA's scientific handshake between environmental signals and infrastructure exposure. VARUNA studies weather and environmental risk. SETU maps that risk against exposed infrastructure, physical assets and public systems so the result can become a risk, resilience or maintenance recommendation.",
    facts: {
      Subject: "Environmental and infrastructure risk",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Connect environmental pressure to public infrastructure consequence",
      "Evidence type": "Scientific method explanation",
      "Related pages": "Research lineage, methodology and validation"
    },
    sections: [
      ["VARUNA", ["A weather event is not only a weather event. VARUNA identifies environmental pressure: rainfall, heat, flood signal, storm exposure or other public-risk conditions that may matter to a place."]],
      ["SETU", ["SETU asks what physical system may fail when that environmental pressure meets a bridge, road, power line, hospital, water system, school, settlement or drainage network."]],
      ["Scientific Handshake", ["The handshake moves from environmental signal to geographic sector, infrastructure exposure, physical or structural simulation, risk or maintenance recommendation and evidence record."]],
      ["What This Page Does Not Claim", ["This page does not claim that every simulation model, dataset or field validation method is publicly disclosed. It explains the public architecture relationship and its limitation."]]
    ],
    faqs: [
      ["What is VARUNA?", "VARUNA is the environmental signal direction inside the DISHA architecture."],
      ["What is SETU?", "SETU maps environmental risk against infrastructure exposure and resilience questions."],
      ["Is this a weather forecast page?", "No. It explains how environmental signals may become public infrastructure risk records."],
      ["What is the public safety use?", "The goal is to preserve evidence around risk, exposure and maintenance recommendation."]
    ],
    cta: ["Explore the Scientific Handshake", "/disha/research-lineage/", "See the disciplines behind the method."]
  },
  "/disha/research-lineage/": {
    title: "DISHA Research Lineage",
    description: "DISHA research lineage connects computing, signals, GIS, cyber evidence, public administration and constitutional accountability.",
    h1: "The Research Lineage of DISHA",
    subtitle: "Disciplines united into one evidence-first intelligence architecture.",
    image: "disha-research-lineage",
    alt: "Research lineage diagram showing the disciplines behind DISHA, including computing, signal studies, GIS, cyber evidence, public administration, constitutional accountability, and infrastructure modelling.",
    caption: "DISHA is formed from several disciplines, not a single technology claim.",
    type: "ScholarlyArticle",
    direct: "DISHA is not built from a single technology. Its research lineage connects computing, signal studies, radio and frequency research, GIS, public-sector systems, geospatial detection, video and alert systems, rescue management, cyber evidence, public administration, constitutional accountability and infrastructure modelling.",
    facts: {
      Subject: "DISHA research lineage",
      Version: "Version 6.6",
      Creator: "Nitish Kumar (@thenitishkr)",
      Purpose: "Show the disciplines behind the architecture",
      "Evidence type": "Research-lineage explanation",
      "Related pages": "Origin, methodology and VARUNA x SETU"
    },
    sections: [
      ["Between Fields", ["DISHA did not come from one field. It came from the space between fields. Computing gave it structure. Signals gave it detection. GIS gave it location. Cyber evidence gave it preservation. Public administration gave it responsibility. Law gave it restraint. Infrastructure modelling gave it consequence."]],
      ["Public-Sector and Geospatial Context", ["The visible lineage includes GIS Capacity in the Government Sector and Geo-spatial Data Structure for Explosive Detection. These are treated as research context and source signals, not as proof of government adoption."]],
      ["Why Interdisciplinary Work Matters", ["Public problems do not stay inside one discipline. A flood is not only weather. A cyber incident is not only a log. A grievance is not only a complaint. A court record is not only a PDF. DISHA connects the disciplines because the real world already connects the harms."]],
      ["What This Page Does Not Claim", ["This page does not claim that every listed discipline is fully implemented as a public operational module. It identifies the research lineage and public architecture relationship."]]
    ],
    faqs: [
      ["Is DISHA only cyber security?", "No. Cyber evidence is one part of a broader public intelligence architecture."],
      ["Why include GIS?", "Location and public assets often decide whether a record becomes public risk."],
      ["Why include law?", "Law keeps intelligence connected to authority, duty and review."],
      ["Does lineage prove deployment?", "No. It establishes research context and architecture formation."]
    ],
    cta: ["Explore the research lineage", "/disha/origin/", "Read the origin record."]
  }
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[c]);
}

function header() {
  return `<header class="site-header">
    <nav class="nav" aria-label="Primary navigation">
      <a class="brand" href="/">THENITISHKR<span>INDIA | RESEARCH - EVIDENCE - INTELLIGENCE</span></a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle><span></span><span></span><span></span></button>
      <div class="nav-links" data-nav-links><a href="/start-here/">Start Here</a><a href="/intelligence/">Intelligence</a><a href="/disha/">DISHA</a><a href="/article-12/">Article 12</a><a href="/digital-constitutional-personhood/">Digital Personhood</a><a href="/news/">News</a><a href="/about/">About</a></div>
      <a class="nav-cta" href="/intelligence/">Read the Archive</a>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="section">
      <div>
        <img class="footer-brand-mark" src="/assets/brand/thenitishkr-logo.png" alt="Nitish Kumar thenitishkr monogram" width="74" height="74" loading="lazy"><div class="footer-logo">THENITISHKR</div>
        <p class="footer-kicker">INDIA | RESEARCH - EVIDENCE - INTELLIGENCE</p>
        <p class="muted" style="margin-top:18px">&copy; 2026 Nitish Kumar (thenitishkr). All Rights Reserved.</p>
      </div>
      <div class="footer-links" aria-label="Footer navigation">
        <a href="/article-12/">Article 12</a>
        <a href="/digital-constitutional-personhood/">Digital Constitutional Personhood</a>
        <a href="/disha/">DISHA</a>
        <a href="/intelligence/">Intelligence</a><a href="/news/">News & Analysis</a>
        <a href="/books/">Books</a>
        <a href="/about/">About</a>
        <a href="/feed.xml">RSS Feed</a>
        <a href="/sitemap/">Research Index</a>
        <a href="/terms/">T&C</a>
        <a href="/privacy-policy/">Privacy</a>
        <a href="/editorial-standards/">Editorial Standards</a>
      </div>
            <div class="social-links" aria-label="Social links">
        <a class="social-icon social-x" href="https://x.com/thenitishkr" aria-label="X / Twitter" title="X / Twitter"><span aria-hidden="true">X</span></a>
        <a class="social-icon social-linkedin" href="https://www.linkedin.com/in/thenitishkr" aria-label="LinkedIn" title="LinkedIn"><span aria-hidden="true">in</span></a>
        <a class="social-icon social-substack" href="https://thenitishkr.substack.com" aria-label="Substack" title="Substack"><span aria-hidden="true">S</span></a>
        <a class="social-icon social-medium" href="https://medium.com/@thenitishkr" aria-label="Medium" title="Medium"><span aria-hidden="true">M</span></a>
        <a class="social-icon social-github" href="https://github.com/Tashima-Tarsh" aria-label="GitHub" title="GitHub"><span aria-hidden="true">GH</span></a>
        <a class="social-icon social-instagram" href="https://www.instagram.com/thenitishkr" aria-label="Instagram" title="Instagram"><span aria-hidden="true">IG</span></a>
        <a class="social-icon social-facebook" href="https://www.facebook.com/thenitishkr" aria-label="Facebook" title="Facebook"><span aria-hidden="true">f</span></a>
        <a class="social-icon social-reddit" href="https://www.reddit.com/user/Ok-File-6559/" aria-label="Reddit" title="Reddit"><span aria-hidden="true">R</span></a>
        <a class="social-icon social-quora" href="https://www.quora.com/profile/Nitish-Kumar-11545" aria-label="Quora" title="Quora"><span aria-hidden="true">Q</span></a>
        <a class="social-icon social-whatsapp" href="https://wa.me/919142197135" aria-label="WhatsApp Business" title="WhatsApp Business"><span aria-hidden="true">WA</span></a>
        <a class="social-icon social-orcid" href="https://orcid.org/0009-0004-6840-4463" aria-label="ORCID" title="ORCID"><span aria-hidden="true">iD</span></a>
        <a class="social-icon social-wikidata" href="https://www.wikidata.org/wiki/Q140001166" aria-label="Wikidata" title="Wikidata" rel="me"><span aria-hidden="true">WD</span></a>
        <a class="social-icon social-amazon" href="https://www.amazon.com/author/nikukr" aria-label="Amazon Author" title="Amazon Author" rel="me"><span aria-hidden="true">A</span></a>
      </div>
    </div>
  </footer>`;
}

function imageMarkup(page, priority = false) {
  const src = page.imagePath || `/assets/images/disha/${page.image}.webp`;
  const set = page.imagePath ? "" : [800, 1200, 1600].map((w) => `/assets/images/disha/${page.image}-${w}.webp ${w}w`).join(", ");
  return `<figure class="disha-figure">
      <picture>${set ? `<source type="image/webp" srcset="${set}" sizes="(max-width: 900px) calc(100vw - 32px), 560px">` : ""}<span class="disha-image-frame"><img src="${src}" alt="${esc(page.alt)}" width="1600" height="900" ${priority ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"></span></picture>
      <figcaption class="disha-caption">${esc(page.caption)}</figcaption>
    </figure>`;
}

function facts(page) {
  return `<section class="disha-section"><div class="disha-shell page-facts"><p class="disha-label">Page Facts</p><dl>${Object.entries(page.facts).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl></div></section>`;
}

function runtimeBox() {
  return `<section class="disha-section">
    <div class="disha-shell runtime-box">
      <p class="disha-label">How this works in DISHA v6.6 runtime</p>
      <h2>Mission to evidence pipeline</h2>
      <div class="disha-prose">
        <p>DISHA does not turn every input into truth. It turns every input into a record that can be examined.</p>
        <p>The current runtime uses a typed mission signal. A signal can include raw text, evidence files, geospatial points, threat indicators, requested action, data-source references, sensitivity, user role, device trust, action risk and telemetry risk.</p>
      </div>
      <ul>
        <li>Normalize mission into DishaSignal.</li>
        <li>Select governed intelligence lenses.</li>
        <li>Return findings, evidence, confidence and risk.</li>
        <li>Evaluate policy before action.</li>
        <li>Allow, confirm, sandbox, read-only, escalate or deny.</li>
        <li>Record important steps as evidence events.</li>
      </ul>
    </div>
  </section>`;
}

function linkGrid(current) {
  return `<section class="disha-section"><div class="disha-shell"><p class="disha-label">Continue through DISHA</p><h2>Architecture pages</h2><div class="disha-link-grid">
    ${nav.map(([href, label, note]) => `<a class="disha-link-card" href="${href}"${href === current ? ' aria-current="page"' : ""}>${esc(label)}<span>${esc(note)}</span></a>`).join("")}
  </div></div></section>`;
}

function faq(page) {
  return `<section class="disha-section" id="disha-faq"><div class="disha-shell"><p class="disha-label">FAQ</p><h2>Questions and answers</h2><div class="faq-list">${page.faqs.map(([q, a]) => `<article class="faq-item"><h3>${esc(q)}</h3><p>${esc(a)}</p></article>`).join("")}</div></div></section>`;
}

function section(page, [title, paras, id]) {
  const ident = id ? ` id="${id}"` : "";
  let extra = "";
  if (id === "chain") extra = `<div class="disha-chain"><span>Signal</span><span>Evidence</span><span>Memory</span><span>Intelligence</span><span>Accountability</span></div>`;
  if (id === "runtime") extra = imageMarkup({ ...page, image: "disha-v66-runtime-boundary", imagePath: "", alt: "DISHA Version 6.6 runtime diagram showing public layers, mission signal, evidence archive, memory and protected control boundary.", caption: "Current v6.6 runtime: mission becomes signal, signal becomes evidence, and high-risk action remains policy-gated." });
  return `<section class="disha-section"${ident}><div class="disha-shell"><h2>${esc(title)}</h2><div class="disha-prose">${paras.map((p) => `<p>${esc(p)}</p>`).join("")}</div>${extra ? `<div style="margin-top:24px">${extra}</div>` : ""}</div></section>`;
}

function originExhibits() {
  return `<section class="disha-section" id="origin-exhibits">
    <div class="disha-shell">
      <p class="disha-label">Origin exhibits</p>
      <h2>Source records behind the chronology</h2>
      <div class="disha-prose">
        <p>The timeline above is supported by visible source exhibits. These records are shown as chronology and research context. They are not presented as proof of government adoption or as proof of every later Version 6.6 capability.</p>
      </div>
      <div class="origin-exhibit-grid" aria-label="DISHA origin source exhibits">
        <figure class="origin-exhibit-card">
          <a class="origin-doc-frame" href="/assets/disha-foundation.webp">
            <img src="/assets/disha-foundation.webp" alt="Original DISHA handwritten foundation sketch dated 25 April 2012." width="1536" height="1024" loading="lazy" decoding="async">
          </a>
          <figcaption><strong>Foundation record</strong><span>Handwritten DISHA architecture sketch dated 25 April 2012.</span></figcaption>
        </figure>
        <figure class="origin-exhibit-card">
          <a class="origin-doc-frame" href="/assets/images/evidence/disha-handmade-foundation-diagram.jpg">
            <img src="/assets/images/evidence/disha-handmade-foundation-diagram.jpg" alt="Second handwritten DISHA development record from the origin archive." width="717" height="538" loading="lazy" decoding="async">
          </a>
          <figcaption><strong>Development record</strong><span>Second handwritten working record showing continued architecture development.</span></figcaption>
        </figure>
        <figure class="origin-exhibit-card">
          <a class="origin-doc-frame origin-doc-tall" href="/assets/images/bihar-science-tech-record.jpg">
            <picture>
              <source srcset="/assets/images/bihar-science-tech-record.webp" type="image/webp">
              <img src="/assets/images/bihar-science-tech-record.jpg" alt="Bihar Council of Science and Technology correspondence record connected to the early DISHA research trail." width="698" height="960" loading="lazy" decoding="async">
            </picture>
          </a>
          <figcaption><strong>Bihar Council correspondence</strong><span>2013 institutional correspondence connected to the early research chronology.</span></figcaption>
        </figure>
      </div>
    </div>
  </section>`;
}

const claimRows = [
  ["CTS-01", "Bihar has 49,649 pending utilisation certificates worth Rs 70,877.61 crore as of 31 March 2024.", "CAG Report 2024", "https://cag.gov.in", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-02", "Union government FY25: 33,973 pending utilisation certificates worth Rs 54,282.32 crore.", "CAG Report FY25", "https://cag.gov.in", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-03", "Punjab floods 2025: 57 deaths, approximately 4 lakh affected, 2,555 villages impacted.", "News on Air, Government of India", "https://newsonair.gov.in", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-04", "Disaster Management Amendment Act 2025 received Presidential assent and commenced on 9 April 2025.", "NDRF official record", "https://ndrf.gov.in", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-05", "Supreme Court W.P.(Crl.) 163/2026 directed MeitY to examine a representation on foreign-server personal data on 19 May 2026 before the CJI Surya Kant bench.", "Court record, redacted PDF", "/assets/docs/WRIT_P_CRL_163_2026_REDACTED.pdf", "Case 02 - MeitY/Data", "/intelligence/meity-digital-governance/", "official", "2026-06-19"],
  ["CTS-06", "W.P.(Crl.) 163/2026 was disposed on 19 May 2026: procedural disposal, not a factual ruling on the merits of data sovereignty.", "Court order record", "/assets/docs/WRIT_P_CRL_163_2026_REDACTED.pdf", "Case 02 - MeitY/Data", "/intelligence/meity-digital-governance/", "official", "2026-06-19"],
  ["CTS-07", "W.P.(Crl.) 394/2025 is a disaster governance and public accountability petition before the Supreme Court.", "Supreme Court record", "/assets/docs/WRIT_P_CRL_163_2026_REDACTED.pdf", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-08", "ODF 100% declarations diverge from ground-reality documented in NSS, NFHS, NARSS and CAG records.", "CAG / NFHS / NARSS records", "https://cag.gov.in", "Case 03 - ODF/Sanitation", "/intelligence/odf-false-justification/", "official", "2026-06-19"],
  ["CTS-09", "Bihar districts were declared ODF without verifiable drainage infrastructure or flood-WASH alignment.", "CAG / State audit records", "https://cag.gov.in", "Case 04 - Bihar ODF", "/intelligence/odf-false-justification/", "official", "2026-06-19"],
  ["CTS-10", "Bihar Special Intensive Revision 2025 was conducted by the Election Commission of India with concerns about burden reversal and migrant non-inclusion.", "Case 12 source record", "/intelligence/sir-constitutional-scam/", "Case 12 - SIR", "/intelligence/sir-constitutional-scam/", "official", "2026-06-19"],
  ["CTS-11", "DISHA was conceived on 25 April 2012 as an evidence-first public-interest intelligence architecture.", "DISHA whitepaper Version 6.6", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "DISHA overview", "/disha/", "disha", "2026-06-19"],
  ["CTS-12", "DISHA was submitted to the Bihar Council of Science and Technology in 2013.", "DISHA whitepaper / BCST correspondence", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "DISHA origin", "/disha/origin/", "official", "2026-06-19"],
  ["CTS-13", "DISHA accuracy is self-assessed at 97% against source-linked government records, court materials, audit records and RTI trails.", "DISHA whitepaper Version 6.6", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "DISHA validation", "/disha/validation/", "disha", "2026-06-19"],
  ["CTS-14", "DISHA architecture comprises six layers: DISHA Brain, Digital Soldiers, Security Brain, Yudh, Evidence Archive and Public Record Memory.", "DISHA whitepaper Version 6.6", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "DISHA overview", "/disha/", "disha", "2026-06-19"],
  ["CTS-15", "DISHA operates under a No-First-Use doctrine: no adversarial action is initiated without a predicate evidence record.", "DISHA whitepaper Version 6.6", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "No-First-Use", "/disha/no-first-use-policy/", "disha", "2026-06-19"],
  ["CTS-16", "The DISHA archive holds 6,000+ evidence items: RTI replies, PDFs, emails, court records and audit trails.", "Evidence inventory", "/EVIDENCE-INVENTORY.md", "DISHA overview", "/disha/", "disha", "2026-06-19"],
  ["CTS-17", "National media coverage includes PTI, Economic Times, The Tribune, Deccan Herald, New Indian Express, ABP Live, LawTrend and Verdictum.", "Press coverage section", "/news/#press-coverage", "Media coverage", "/news/#press-coverage", "corroborated", "2026-06-19"],
  ["CTS-18", "Nitish Kumar (@thenitishkr) published Era of Stupidity: Citizen Not Found, ISBN 978-9355920126.", "Amazon author page", "https://www.amazon.com/author/nikukr", "Books", "/books/", "corroborated", "2026-06-19"],
  ["CTS-19", "Nitish Kumar (@thenitishkr) published Sleeping Guardian: India Lost Justice, ISBN 979-8274694070.", "Amazon author page", "https://www.amazon.com/author/nikukr", "Books", "/books/", "corroborated", "2026-06-19"],
  ["CTS-20", "Nitish Kumar (@thenitishkr) holds Wikidata entity Q140001166.", "Wikidata Q140001166", "https://www.wikidata.org/wiki/Q140001166", "Authority record", "/about/", "corroborated", "2026-06-19"],
  ["CTS-21", "Nitish Kumar (@thenitishkr) holds ORCID 0009-0004-6840-4463.", "ORCID registry", "https://orcid.org/0009-0004-6840-4463", "Authority record", "/about/", "corroborated", "2026-06-19"],
  ["CTS-22", "Personal data of Indian citizens may be stored on foreign servers without adequate legal protection.", "W.P.(Crl.) 163/2026, redacted", "/assets/docs/WRIT_P_CRL_163_2026_REDACTED.pdf", "Case 02 - MeitY/Data", "/intelligence/meity-digital-governance/", "unresolved", "2026-06-19"],
  ["CTS-23", "The Bihar SIR 2025 process may have unconstitutionally reversed the burden of proof onto voters.", "Case 12 analysis", "/intelligence/sir-constitutional-scam/", "Case 12 - SIR", "/intelligence/sir-constitutional-scam/", "unresolved", "2026-06-19"],
  ["CTS-24", "Migrant populations in Bihar were not adequately accounted for during SIR 2025, risking disenfranchisement.", "Case 12 source record", "/intelligence/sir-constitutional-scam/", "Case 12 - SIR", "/intelligence/sir-constitutional-scam/", "unresolved", "2026-06-19"],
  ["CTS-25", "Bihar's pending UC volume, Rs 70,877.61 crore, is the highest among states audited in the CAG 2024 report.", "CAG Report 2024 state table", "https://cag.gov.in", "Case 01 - NDMA", "/intelligence/ndma-disaster-governance/", "official", "2026-06-19"],
  ["CTS-26", "The DISHA whitepaper is publicly available at /assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf.", "DISHA whitepaper Version 6.6", "/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf", "DISHA overview", "/disha/", "disha", "2026-06-19"],
  ["CTS-27", "RTI replies obtained under the Right to Information Act 2005 form part of the evidence base across multiple case files.", "Evidence inventory", "/EVIDENCE-INVENTORY.md", "Intelligence archive", "/intelligence/", "official", "2026-06-19"]
];

function badge(label) {
  const names = { official: "Official", corroborated: "Corroborated", disha: "DISHA assessment", unresolved: "Unresolved" };
  return `<span class="claim-badge claim-${label}">${names[label]}</span>`;
}

function claimLedger() {
  const counts = claimRows.reduce((acc, row) => {
    acc[row[6]] = (acc[row[6]] || 0) + 1;
    return acc;
  }, {});
  return `<section class="disha-section" id="open-source-claims">
    <div class="disha-shell">
      <p class="disha-label">Open-source claim ledger</p>
      <h2>Cases and evidence records</h2>
      <div class="disha-prose">
        <p>This table restores the public claim-to-source ledger. It links each claim to the direct source, related case file, evidence class and last verification date so the record can be checked instead of accepted blindly.</p>
      </div>
      <div class="claim-ledger-summary" aria-label="Claim ledger status summary">
        <div><strong>${claimRows.length}</strong><span>Claim records</span></div>
        <div><strong>${counts.official || 0}</strong><span>Official records</span></div>
        <div><strong>${counts.corroborated || 0}</strong><span>Corroborated records</span></div>
        <div><strong>${counts.disha || 0}</strong><span>DISHA assessments</span></div>
        <div><strong>${counts.unresolved || 0}</strong><span>Unresolved questions</span></div>
      </div>
      <div class="claim-ledger-tools" role="group" aria-label="Filter by evidence class">
        <button class="claim-filter active" type="button" data-claim-filter="all">All</button>
        <button class="claim-filter" type="button" data-claim-filter="official">Official</button>
        <button class="claim-filter" type="button" data-claim-filter="corroborated">Corroborated</button>
        <button class="claim-filter" type="button" data-claim-filter="disha">DISHA assessment</button>
        <button class="claim-filter" type="button" data-claim-filter="unresolved">Unresolved</button>
      </div>
      <div class="claim-table-wrap" role="region" aria-label="DISHA claim-to-source live table" tabindex="0">
        <table class="claim-ledger-table" id="claim-ledger-table">
          <caption>DISHA claim-to-source live table - thenitishkr.in</caption>
          <thead><tr><th scope="col">Claim ID</th><th scope="col">Claim</th><th scope="col">Direct source</th><th scope="col">Case file</th><th scope="col">Evidence class</th><th scope="col">Verified</th></tr></thead>
          <tbody>
            ${claimRows.map(([id, claim, sourceText, sourceUrl, caseText, caseUrl, category, verified]) => `<tr data-claim-cat="${category}"><td>${esc(id)}</td><td>${esc(claim)}</td><td><a href="${sourceUrl}"${sourceUrl.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(sourceText)}</a></td><td><a href="${caseUrl}">${esc(caseText)}</a></td><td>${badge(category)}</td><td>${esc(verified)}</td></tr>`).join("\n")}
          </tbody>
        </table>
      </div>
      <div class="claim-ledger-cta">
        <div>
          <p class="disha-label">Use the ledger</p>
          <h3>Start from the source, then read the case.</h3>
          <p>Open a source record, compare the evidence class, then move to the related case file. That is the intended reading path.</p>
        </div>
        <div class="disha-actions">
          <a class="button" href="/intelligence/">Open intelligence archive</a>
          <a class="button secondary" href="/disha/validation/">Read validation standard</a>
          <a class="button secondary" href="/disha/methodology/">Read methodology</a>
        </div>
      </div>
    </div>
  </section>
  <script>
    (function () {
      var buttons = document.querySelectorAll("[data-claim-filter]");
      var rows = document.querySelectorAll("#claim-ledger-table tbody tr");
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          var filter = button.getAttribute("data-claim-filter");
          buttons.forEach(function (item) { item.classList.remove("active"); });
          button.classList.add("active");
          rows.forEach(function (row) {
            row.hidden = filter !== "all" && row.getAttribute("data-claim-cat") !== filter;
          });
        });
      });
    })();
  </script>`;
}

function schema(route, page) {
  const url = `${site}${route}`;
  const image = `${site}${page.imagePath || `/assets/images/disha/${page.image}.webp`}`;
  const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
    { "@type": "ListItem", position: 2, name: "DISHA", item: `${site}/disha/` },
    ...(route === "/disha/" ? [] : [{ "@type": "ListItem", position: 3, name: page.h1, item: url }])
  ]};
  const faqNode = { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: page.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const article = { "@type": page.type, "@id": `${url}#article`, headline: page.h1, description: page.description, url, author: { "@id": `${site}/#person` }, publisher: { "@type": "Organization", name: publisher }, datePublished: "2026-06-21", dateModified: today, image, inLanguage: "en-IN", isAccessibleForFree: true };
  if (route !== "/disha/") return { "@context": "https://schema.org", "@graph": [breadcrumb, article, faqNode, { "@type": "ImageObject", contentUrl: image, encodingFormat: "image/webp", width: 1600, height: 900, caption: page.caption }] };
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": `${site}/#website`, name: "Nitish Kumar", url: `${site}/`, publisher: { "@id": `${site}/#person` }, inLanguage: "en-IN" },
    { "@type": "Person", "@id": `${site}/#person`, name: "Nitish Kumar", alternateName: "thenitishkr", url: `${site}/`, sameAs: ["https://x.com/thenitishkr", "https://www.linkedin.com/in/thenitishkr", "https://orcid.org/0009-0004-6840-4463", "https://www.wikidata.org/wiki/Q140001166"] },
    { "@type": "CreativeWork", "@id": `${site}/disha/#architecture`, name: "DISHA Advanced Intelligence Architecture", alternateName: ["DISHA", "DISHA Intelligence 6.6"], sameAs: "https://www.wikidata.org/wiki/Q140167664", creator: { "@id": `${site}/#person` }, author: { "@id": `${site}/#person` }, dateCreated: "2012-04-25", version: "6.6", inLanguage: "en-IN", url, description: page.description, subjectOf: { "@type": "Report", name: "DISHA Intelligence Architecture: A Technical Whitepaper (Ver 6.6)", url: `${site}/assets/docs/disha-whitepaper-what-it-can-what-it-did-v66.pdf`, datePublished: "2026", author: { "@id": `${site}/#person` }, inLanguage: "en-IN" } },
    { "@type": "Person", "@id": `${site}/disha/#advisor-meenakshi-sharma`, name: "Prof. Dr. Meenakshi Sharma", description: "Research adviser named in the documented early GIS and geospatial research context." },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, breadcrumb: { "@id": `${url}#breadcrumb` }, primaryImageOfPage: { "@id": `${url}#image` }, dateModified: today, inLanguage: "en-IN" },
    article,
    { "@type": "ImageObject", "@id": `${url}#image`, contentUrl: image, encodingFormat: "image/webp", width: 1600, height: 900, caption: page.caption },
    breadcrumb,
    faqNode
  ]};
}

function pageHtml(route, page) {
  const url = `${site}${route}`;
  const image = `${site}${page.imagePath || `/assets/images/disha/${page.image}.webp`}`;
  const isMain = route === "/disha/";
  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/favicon.ico?v=tnk-20260610" sizes="any">
  <link rel="icon" href="/assets/brand/favicon-64.png?v=tnk-20260610" type="image/png" sizes="64x64">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=tnk-20260610" sizes="180x180">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="author" content="Nitish Kumar">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="en-IN" href="${url}">
  <link rel="alternate" hreflang="x-default" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="thenitishkr">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1600">
  <meta property="og:image:height" content="900">
  <meta property="og:image:alt" content="${esc(page.alt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@thenitishkr">
  <meta name="twitter:creator" content="@thenitishkr">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${image}">
  <link rel="preload" as="font" href="/assets/fonts/inter-latin-variable.woff2" type="font/woff2" crossorigin>
  <link rel="preload" as="font" href="/assets/fonts/playfair-display-latin-variable.woff2" type="font/woff2" crossorigin>
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="/styles.css?v=20260626">
  <link rel="stylesheet" href="/editorial-preview.css?v=preview-20260611news">
  <link rel="stylesheet" href="/disha/disha-section.css?v=20260629">
  <script type="application/ld+json">${JSON.stringify(schema(route, page))}</script>
</head>
<body class="disha-architecture-page">
  <a class="skip-link" href="#main-content">Skip to content</a>
  ${header()}
  <main id="main-content">
    <div class="disha-shell disha-breadcrumb"><a href="/">Home</a> / <a href="/disha/">DISHA</a>${isMain ? "" : ` / ${esc(page.h1)}`}</div>
    <section class="disha-shell disha-hero${isMain ? " disha-hero-wide-image" : ""}">
      <div>
        <p class="disha-kicker">DISHA public architecture</p>
        <h1>${esc(page.h1)}</h1>
        <p class="disha-subtitle">${esc(page.subtitle)}</p>
        <div class="disha-actions">
          <a class="button" href="${page.cta[1]}">${esc(page.cta[0])}</a>
          <a class="button secondary" href="/disha/origin/">Read the origin record</a>
          <a class="button secondary" href="/disha/claim-to-source-system/">Open claim-to-source</a>
        </div>
      </div>
      ${imageMarkup(page, true)}
    </section>
    <section class="disha-section" id="what-is-disha"><div class="disha-shell answer-box"><p class="disha-label">Direct Answer</p><div class="disha-prose"><p>${esc(page.direct)}</p></div></div></section>
    ${facts(page)}
    ${runtimeBox()}
    ${page.sections.map((item) => section(page, item)).join("\n")}
    ${route === "/disha/origin/" ? originExhibits() : ""}
    ${route === "/disha/claim-to-source-system/" ? claimLedger() : ""}
    <section class="disha-section"><div class="disha-shell disha-note"><p class="disha-label">Research note</p><p>${esc(page.h1)} is part of the DISHA public architecture record authored by Nitish Kumar (@thenitishkr). It is written for scrutiny and source-aware reading, not blind acceptance.</p><pre class="citation-text">Nitish Kumar (@thenitishkr). "${esc(page.h1)}." thenitishkr.in, ${today}. ${url}</pre></div></section>
    ${linkGrid(route)}
    ${faq(page)}
    <section class="disha-section"><div class="disha-shell disha-cta"><div><p class="disha-label">Next step</p><h2>${esc(page.cta[0])}</h2><p>${esc(page.cta[2])}</p></div><a class="button" href="${page.cta[1]}">Continue</a></div></section>
  </main>
  ${footer()}
  <script src="/script.js?v=20260621" defer></script>
</body>
</html>
`;
}

for (const [route, page] of Object.entries(pages)) {
  const dir = route === "/disha/" ? path.join(root, "disha") : path.join(root, route.replace(/^\/|\/$/g, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(route, page));
}

console.log(`Built ${Object.keys(pages).length} DISHA pages.`);
