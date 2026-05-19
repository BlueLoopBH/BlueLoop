// BlueLoop shared JavaScript: navigation, animations, stats, and forms.
document.addEventListener("DOMContentLoaded", () => {
  setupLanguageSupport();
  setupActiveNavigation();
  setupMobileNavigation();
  setupScrollAnimations();
  setupStatAnimations();
  setupReportForm();
  setupContactForm();
});

// Local English/Arabic translation support. The script registers matching visible text
// with data-i18n keys, then swaps copy and document direction based on localStorage.
const translationEntries = [
  ["navHome", "Home", "الرئيسية"],
  ["navAbout", "About", "عن BlueLoop"],
  ["navProblem", "Problem", "المشكلة"],
  ["navCampaigns", "Campaigns", "الحملات"],
  ["navReport", "Report Pollution", "الإبلاغ عن التلوث"],
  ["navRewards", "Rewards", "المكافآت"],
  ["navData", "Data Insights", "رؤى البيانات"],
  ["navContact", "Contact", "تواصل معنا"],
  ["homeEyebrow", "Marine protection platform for Bahrain", "منصة لحماية البيئة البحرية في البحرين"],
  ["homeTitle", "Turn coastal pollution reports into cleaner seas.", "حوّل بلاغات التلوث الساحلي إلى بحار أنظف."],
  ["homeDesc", "BlueLoop helps people report ocean pollution, upload evidence, earn reward points, and give companies reliable environmental insights for marine protection.", "تساعد BlueLoop الناس على الإبلاغ عن تلوث البحر، ورفع الأدلة، وكسب نقاط المكافآت، وتزويد الشركات برؤى بيئية موثوقة لحماية الحياة البحرية."],
  ["ctaReport", "Report Pollution", "أبلغ عن التلوث"],
  ["ctaCampaigns", "View Campaigns", "عرض الحملات"],
  ["reportsSubmitted", "Reports Submitted", "البلاغات المقدمة"],
  ["cleanupCampaigns", "Cleanup Campaigns", "حملات التنظيف"],
  ["rewardPoints", "Reward Points Earned", "نقاط المكافآت المكتسبة"],
  ["partnerCompanies", "Partner Companies", "الشركات الشريكة"],
  ["howWorks", "How BlueLoop works", "كيف تعمل BlueLoop"],
  ["loopTitle", "Community reporting, rewards, and action in one loop.", "بلاغات المجتمع والمكافآت والعمل في حلقة واحدة."],
  ["spotPollution", "Spot pollution", "اكتشاف التلوث"],
  ["spotText", "Notice plastic waste, oil traces, abandoned gear, or other coastal hazards.", "لاحظ النفايات البلاستيكية أو آثار الزيت أو المعدات المهجورة أو أي مخاطر ساحلية أخرى."],
  ["submitReport", "Submit report", "إرسال بلاغ"],
  ["submitText", "Add the location, description, and image evidence through BlueLoop.", "أضف الموقع والوصف والصور الداعمة عبر BlueLoop."],
  ["earnRewards", "Earn rewards", "اكسب المكافآت"],
  ["earnText", "Receive points for helpful verified reports and campaign participation.", "احصل على نقاط مقابل البلاغات المفيدة المؤكدة والمشاركة في الحملات."],
  ["cleanerSeas", "Support cleaner seas", "ادعم بحارًا أنظف"],
  ["cleanerText", "Help partners prioritize cleanup work and protect marine ecosystems.", "ساعد الشركاء على تحديد أولويات التنظيف وحماية النظم البحرية."],
  ["whyBahrain", "Why Bahrain needs BlueLoop", "لماذا تحتاج البحرين إلى BlueLoop"],
  ["visibilityTitle", "Marine protection starts with faster visibility.", "تبدأ حماية البحر برؤية أسرع للمشكلة."],
  ["bahrainText1", "Bahrain's coastlines support biodiversity, tourism, fishing communities, and everyday connection to the sea. Pollution can appear quickly and disappear from view before teams know where to respond.", "تدعم سواحل البحرين التنوع الحيوي والسياحة ومجتمعات الصيد والارتباط اليومي بالبحر. قد يظهر التلوث بسرعة ويختفي قبل أن تعرف الفرق أين تستجيب."],
  ["bahrainText2", "BlueLoop creates a practical reporting layer for citizens, schools, companies, and environmental partners so local observations can become coordinated action.", "تنشئ BlueLoop طبقة عملية للإبلاغ تخدم المواطنين والمدارس والشركات والشركاء البيئيين حتى تتحول الملاحظات المحلية إلى عمل منظم."],
  ["mappedReports", "Coastal reports mapped across Bahrain", "بلاغات ساحلية مرسومة على خريطة البحرين"],
  ["dataForCompanies", "Data for companies", "بيانات للشركات"],
  ["insightTitle", "Environmental insight without guesswork.", "رؤى بيئية بلا تخمين."],
  ["insightText1", "BlueLoop gives companies a clearer view of marine pollution patterns, campaign participation, and measurable coastal protection contributions.", "تمنح BlueLoop الشركات رؤية أوضح لأنماط التلوث البحري والمشاركة في الحملات ومساهمات حماية السواحل القابلة للقياس."],
  ["insightText2", "Partners can use these insights to plan sustainability initiatives, support local cleanup work, and communicate impact with more confidence.", "يمكن للشركاء استخدام هذه الرؤى لتخطيط مبادرات الاستدامة ودعم أعمال التنظيف المحلية وعرض الأثر بثقة أكبر."],
  ["campaignHeading", "Focused actions for cleaner coastlines.", "إجراءات مركزة لسواحل أنظف."],
  ["plasticCampaign", "Plastic Watch: North Coast Reporting Drive", "مراقبة البلاستيك: حملة بلاغات الساحل الشمالي"],
  ["weekendCleanup", "Weekend Marine Cleanup", "تنظيف بحري في عطلة نهاية الأسبوع"],
  ["partnerImpact", "Partner Impact Challenge", "تحدي أثر الشركاء"],
  ["reportingDrive", "Reporting Drive", "حملة بلاغات"],
  ["communityCleanup", "Community Cleanup", "تنظيف مجتمعي"],
  ["corporateAction", "Corporate Action", "عمل مؤسسي"],
  ["plasticPreview", "Map recurring plastic waste along northern coastlines with clear photo evidence.", "ارسم مواقع النفايات البلاستيكية المتكررة على السواحل الشمالية باستخدام صور واضحة."],
  ["cleanupPreview", "Support volunteer teams using verified report locations and reward participation.", "ادعم فرق المتطوعين باستخدام مواقع البلاغات المؤكدة ومكافأة المشاركة."],
  ["partnerPreview", "Help companies sponsor targeted cleanup work and track environmental outcomes.", "ساعد الشركات على رعاية أعمال تنظيف موجهة وتتبع النتائج البيئية."],
  ["joinLoop", "Join the loop", "انضم إلى الحلقة"],
  ["protectToday", "Help protect Bahrain's marine life today.", "ساعد في حماية الحياة البحرية في البحرين اليوم."],
  ["finalCtaText", "Report pollution, join a campaign, or explore how BlueLoop data can support your organization's environmental goals.", "أبلغ عن التلوث أو انضم إلى حملة أو اكتشف كيف يمكن لبيانات BlueLoop دعم أهداف مؤسستك البيئية."],
  ["aboutHero", "Building a cleaner future for Bahrain's seas.", "نبني مستقبلًا أنظف لبحار البحرين."],
  ["aboutBlueLoop", "About BlueLoop", "عن BlueLoop"],
  ["aboutHeroText", "BlueLoop connects citizens, environmental teams, and responsible companies around one shared goal: protecting marine life through verified reporting, rewards, and data.", "تربط BlueLoop المواطنين والفرق البيئية والشركات المسؤولة حول هدف واحد: حماية الحياة البحرية عبر البلاغات المؤكدة والمكافآت والبيانات."],
  ["ourMission", "Our mission", "مهمتنا"],
  ["missionTitle", "Make marine protection visible, practical, and rewarding.", "جعل حماية البحر واضحة وعملية ومجزية."],
  ["missionText1", "BlueLoop gives people in Bahrain a simple way to report ocean pollution, upload evidence, and support cleanup work. Every verified report helps build a clearer picture of what is happening along the coast.", "تمنح BlueLoop الناس في البحرين طريقة بسيطة للإبلاغ عن تلوث البحر ورفع الأدلة ودعم أعمال التنظيف. كل بلاغ مؤكد يساعد في بناء صورة أوضح لما يحدث على الساحل."],
  ["missionText2", "By combining community reporting with environmental data insights, BlueLoop helps turn local observations into action for healthier marine ecosystems.", "من خلال الجمع بين بلاغات المجتمع ورؤى البيانات البيئية، تساعد BlueLoop على تحويل الملاحظات المحلية إلى عمل يدعم أنظمة بحرية أكثر صحة."],
  ["values", "Our values", "قيمنا"],
  ["valuesTitle", "Designed for real environmental action.", "مصممة لعمل بيئي حقيقي."],
  ["localResponsibility", "Local responsibility", "مسؤولية محلية"],
  ["evidenceFirst", "Evidence first", "الأدلة أولًا"],
  ["sharedImpact", "Shared impact", "أثر مشترك"],
  ["marineGoal", "Marine protection goal", "هدف حماية البحر"],
  ["healthierSeas", "Healthier seas are the foundation of BlueLoop.", "البحار الصحية هي أساس BlueLoop."],
  ["vision", "Our vision for Bahrain", "رؤيتنا للبحرين"],
  ["visionTitle", "A coastline where environmental action is easy to start and easy to measure.", "ساحل يسهل فيه بدء العمل البيئي وقياسه."],
  ["problemHero", "Marine pollution is often visible only after damage has begun.", "غالبًا لا يظهر التلوث البحري إلا بعد بدء الضرر."],
  ["problemHeroText", "Bahrain's waters need faster reporting, clearer evidence, and better coordination between communities, companies, and environmental teams.", "تحتاج مياه البحرين إلى إبلاغ أسرع وأدلة أوضح وتنسيق أفضل بين المجتمع والشركات والفرق البيئية."],
  ["marinePollution", "Marine pollution", "التلوث البحري"],
  ["problemBig", "Plastic waste, oil traces, chemicals, and abandoned gear can move quickly through coastal environments.", "يمكن للنفايات البلاستيكية وآثار الزيت والمواد الكيميائية والمعدات المهجورة أن تتحرك بسرعة في البيئات الساحلية."],
  ["marineLife", "Marine life", "الحياة البحرية"],
  ["coastlines", "Coastlines", "السواحل"],
  ["community", "Community", "المجتمع"],
  ["bahrainContext", "Bahrain context", "سياق البحرين"],
  ["islandTitle", "A small island nation needs fast local visibility.", "تحتاج دولة جزيرية صغيرة إلى رؤية محلية سريعة."],
  ["seenPollution", "Seen pollution near the coast?", "هل رأيت تلوثًا قرب الساحل؟"],
  ["seenText", "Your report can help identify hotspots and support cleaner waters.", "يمكن لبلاغك أن يساعد في تحديد النقاط الساخنة ودعم مياه أنظف."],
  ["campaignHero", "Coordinated action for cleaner coastlines.", "عمل منظم لسواحل أنظف."],
  ["featuredCampaign", "Featured campaign", "حملة مميزة"],
  ["joinDrive", "Join the Drive", "انضم إلى الحملة"],
  ["activeTracks", "Active campaign tracks", "مسارات الحملات النشطة"],
  ["submitAReport", "Submit a Report", "أرسل بلاغًا"],
  ["volunteer", "Volunteer", "تطوع"],
  ["partnerWithUs", "Partner With Us", "كن شريكًا معنا"],
  ["upcomingTimeline", "Upcoming timeline", "الجدول القادم"],
  ["volunteerBlueLoop", "Volunteer With BlueLoop", "تطوع مع BlueLoop"],
  ["reportHero", "Submit clear evidence from Bahrain's coast.", "أرسل أدلة واضحة من سواحل البحرين."],
  ["reportHeroText", "Your report helps BlueLoop identify pollution hotspots and guide cleanup activity.", "يساعد بلاغك BlueLoop على تحديد نقاط التلوث وتوجيه نشاط التنظيف."],
  ["reportForm", "Pollution report form", "نموذج بلاغ التلوث"],
  ["formIntro", "Share what you saw, where you saw it, and any image evidence that can help verify the report.", "شارك ما رأيته وأين رأيته وأي صور يمكن أن تساعد في تأكيد البلاغ."],
  ["reporterInfo", "Reporter information", "معلومات المبلّغ"],
  ["fullName", "Full Name", "الاسم الكامل"],
  ["emailAddress", "Email Address", "البريد الإلكتروني"],
  ["pollutionDetails", "Pollution details", "تفاصيل التلوث"],
  ["typePollution", "Type of Pollution", "نوع التلوث"],
  ["selectType", "Select a type", "اختر النوع"],
  ["plasticWaste", "Plastic waste", "نفايات بلاستيكية"],
  ["oilPollution", "Oil pollution", "تلوث زيتي"],
  ["abandonedGear", "Abandoned fishing gear", "معدات صيد مهجورة"],
  ["chemicalWaste", "Chemical waste", "نفايات كيميائية"],
  ["other", "Other", "أخرى"],
  ["location", "Location", "الموقع"],
  ["dateObserved", "Date Observed", "تاريخ الملاحظة"],
  ["description", "Description", "الوصف"],
  ["uploadEvidence", "Upload Image Evidence", "رفع صورة كدليل"],
  ["submitReportBtn", "Submit Report", "إرسال البلاغ"],
  ["reportingTips", "Reporting tips", "نصائح الإبلاغ"],
  ["usefulReport", "Make your report useful.", "اجعل بلاغك مفيدًا."],
  ["nextSteps", "What happens next?", "ماذا يحدث بعد ذلك؟"],
  ["rewardsHero", "Points that encourage real-world environmental action.", "نقاط تشجع العمل البيئي على أرض الواقع."],
  ["howEarned", "How points are earned", "كيف تُكتسب النقاط"],
  ["rewardExamples", "Reward examples", "أمثلة على المكافآت"],
  ["communityImpact", "Community impact", "الأثر المجتمعي"],
  ["rewardsFaq", "Rewards FAQ", "أسئلة المكافآت"],
  ["dataHero", "Marine impact intelligence for companies.", "ذكاء الأثر البحري للشركات."],
  ["dataHeroText", "BlueLoop converts verified pollution reports and campaign activity into practical dashboards for sustainability teams.", "تحوّل BlueLoop البلاغات المؤكدة ونشاط الحملات إلى لوحات عملية لفرق الاستدامة."],
  ["businessBenefits", "Business benefits", "فوائد للشركات"],
  ["measureImpact", "Measure marine impact", "قياس الأثر البحري"],
  ["dataInsightsProvide", "Data insights we provide", "رؤى البيانات التي نقدمها"],
  ["contactCompanies", "Contact for Companies", "تواصل للشركات"],
  ["contactHero", "Work with BlueLoop.", "اعمل مع BlueLoop."],
  ["contactHeroText", "Reach out about campaigns, company insights, partnerships, rewards, or marine protection projects in Bahrain.", "تواصل معنا حول الحملات أو رؤى الشركات أو الشراكات أو المكافآت أو مشاريع حماية البحر في البحرين."],
  ["sendMessage", "Send a message", "أرسل رسالة"],
  ["contactDetails", "Contact details", "بيانات التواصل"],
  ["organization", "Organization", "المؤسسة"],
  ["message", "Message", "الرسالة"],
  ["topic", "Topic", "الموضوع"],
  ["yourMessage", "Your Message", "رسالتك"],
  ["sendMessageBtn", "Send Message", "إرسال الرسالة"],
  ["followBlueLoop", "Follow BlueLoop", "تابع BlueLoop"],
  ["followText", "Stay updated with campaigns, cleanups, and marine protection efforts in Bahrain.", "ابقَ على اطلاع بالحملات والتنظيف وجهود حماية البحر في البحرين."],
  ["instagram", "Instagram", "إنستغرام"],
  ["twitter", "Twitter (X)", "تويتر (X)"],
  ["linkedin", "LinkedIn", "لينكدإن"],
  ["tiktok", "TikTok", "تيك توك"],
  ["igDesc", "Campaign updates & visuals", "تحديثات وصور الحملات"],
  ["xDesc", "Cleanup alerts & quick updates", "تنبيهات التنظيف وتحديثات سريعة"],
  ["liDesc", "Company insights & partnerships", "رؤى الشركات والشراكات"],
  ["ttDesc", "Short videos from campaigns", "مقاطع قصيرة من الحملات"],
  ["coastalSnapshot", "Coastal report snapshot", "لمحة عن البلاغات الساحلية"],
  ["northCoast", "North coast", "الساحل الشمالي"],
  ["reportsByType", "Reports by Type", "البلاغات حسب النوع"],
  ["verifiedReports", "Verified reports", "بلاغات مؤكدة"],
  ["beachLitter", "Beach litter", "مخلفات الشاطئ"],
  ["fishingNets", "Fishing nets", "شباك صيد"],
  ["cleanupRequests", "Cleanup requests", "طلبات التنظيف"],
  ["openRequests", "8 open", "8 مفتوحة"],
  ["evidenceUploaded", "Evidence uploaded", "الأدلة المرفوعة"],
  ["images36", "36 images", "36 صورة"],
  ["images3", "3 images", "3 صور"],
  ["rewardEstimate", "Reward estimate", "تقدير المكافأة"],
  ["points120", "+120 pts", "+120 نقطة"],
  ["companyInsights", "Company insights", "رؤى الشركات"],
  ["marineDashboard", "Marine Impact Dashboard", "لوحة الأثر البحري"],
  ["monthlyVerified", "Monthly Verified Reports", "البلاغات المؤكدة شهريًا"],
  ["hotspotTrend", "Hotspot trend:", "اتجاه النقاط الساخنة:"],
  ["priorityArea", "Priority area:", "منطقة أولوية:"],
  ["hotspotText", "Plastic reports down 18% after campaign activity.", "انخفضت بلاغات البلاستيك 18% بعد نشاط الحملة."],
  ["priorityText", "Two coastline zones need partner cleanup support.", "تحتاج منطقتان ساحليتان إلى دعم تنظيف من الشركاء."],
  ["verified", "Verified", "مؤكد"],
  ["reports", "Reports", "بلاغات"],
  ["live", "Live", "مباشر"],
  ["marineRisk", "Marine Risk Overview", "نظرة عامة على المخاطر البحرية"],
  ["blueloopBusiness", "BlueLoop Business", "BlueLoop للأعمال"],
  ["reportsMonth", "Reports this month", "بلاغات هذا الشهر"],
  ["hotspots", "Verified hotspots", "نقاط ساخنة مؤكدة"],
  ["campaignImpact", "Campaign impact", "أثر الحملة"],
  ["partnerCleanupRequests", "Partner cleanup requests", "طلبات تنظيف الشركاء"],
  ["pollutionByType", "Pollution Reports by Type", "بلاغات التلوث حسب النوع"],
  ["oilSpills", "Oil spills", "تسربات زيتية"],
  ["plasticChartCaption", "Plastic waste and beach litter account for most reported issues this month.", "تشكل النفايات البلاستيكية ومخلفات الشاطئ معظم البلاغات هذا الشهر."],
  ["verifiedChartCaption", "Verification volume is rising as community reporting and campaign activity increase.", "يزداد عدد البلاغات المؤكدة مع نمو بلاغات المجتمع ونشاط الحملات."],
  ["planSmart", "Plan smarter initiatives", "خطط مبادرات أذكى"],
  ["planSmartText", "Use location-based insights to support the right coastline areas.", "استخدم رؤى مبنية على الموقع لدعم المناطق الساحلية المناسبة."],
  ["crediblePartners", "Build credible partnerships", "ابنِ شراكات موثوقة"],
  ["credibleText", "Connect sustainability goals with visible community action.", "اربط أهداف الاستدامة بعمل مجتمعي واضح."],
  ["trackText", "Track reports, participation, and campaign outcomes over time.", "تتبع البلاغات والمشاركة ونتائج الحملات بمرور الوقت."],
  ["clearSignals", "Clear signals for environmental decision-making.", "مؤشرات واضحة لاتخاذ قرارات بيئية."],
  ["pollutionTrends", "Pollution type trends by area", "اتجاهات أنواع التلوث حسب المنطقة"],
  ["hotspotSummaries", "Verified hotspot summaries", "ملخصات النقاط الساخنة المؤكدة"],
  ["campaignMetrics", "Campaign participation metrics", "مقاييس المشاركة في الحملات"],
  ["cleanupActivity", "Before-and-after cleanup activity", "نشاط التنظيف قبل وبعد"],
  ["rewardPatterns", "Reward engagement patterns", "أنماط التفاعل مع المكافآت"],
  ["companyCta", "Bring BlueLoop insights into your sustainability program.", "أدخل رؤى BlueLoop في برنامج الاستدامة لديك."],
  ["campaignHeroText", "BlueLoop campaigns turn reports into focused cleanup, awareness, and company-supported sustainability initiatives.", "تحوّل حملات BlueLoop البلاغات إلى تنظيف مركز وتوعية ومبادرات استدامة تدعمها الشركات."],
  ["plasticLong", "A focused month-long effort to document recurring plastic waste, gather evidence, and support targeted cleanup work along high-traffic coastal areas.", "جهد مركز لمدة شهر لتوثيق النفايات البلاستيكية المتكررة وجمع الأدلة ودعم تنظيف موجه في المناطق الساحلية المزدحمة."],
  ["plasticDetail", "Residents and students document recurring plastic waste along northern coastlines, helping BlueLoop identify hotspots for cleanup planning.", "يوثق السكان والطلاب النفايات البلاستيكية المتكررة على السواحل الشمالية، مما يساعد BlueLoop على تحديد النقاط الساخنة للتنظيف."],
  ["cleanupDetail", "Volunteer teams use verified report locations to organize focused weekend cleanup activity and reward community participation.", "تستخدم فرق المتطوعين مواقع البلاغات المؤكدة لتنظيم تنظيف مركز في عطلة نهاية الأسبوع ومكافأة المشاركة المجتمعية."],
  ["partnerDetail", "Companies sponsor targeted cleanup work, support campaign logistics, and receive summarized environmental impact insights.", "ترعى الشركات أعمال تنظيف موجهة وتدعم تنظيم الحملات وتحصل على ملخصات للأثر البيئي."],
  ["week1", "Week 1", "الأسبوع 1"],
  ["week2", "Week 2", "الأسبوع 2"],
  ["week3", "Week 3", "الأسبوع 3"],
  ["week4", "Week 4", "الأسبوع 4"],
  ["timeline1", "Open reporting window and community awareness posts.", "فتح فترة البلاغات ونشر توعية مجتمعية."],
  ["timeline2", "Evidence review and hotspot mapping.", "مراجعة الأدلة ورسم خريطة النقاط الساخنة."],
  ["timeline3", "Volunteer cleanup coordination with partners.", "تنسيق تنظيف المتطوعين مع الشركاء."],
  ["timeline4", "Impact summary and reward points distribution.", "ملخص الأثر وتوزيع نقاط المكافآت."],
  ["bringGroup", "Bring your school, company, or community group into the next campaign.", "أحضر مدرستك أو شركتك أو مجموعتك المجتمعية إلى الحملة القادمة."],
  ["tipsPhoto", "Take a clear photo from a safe distance.", "التقط صورة واضحة من مسافة آمنة."],
  ["tipsLandmark", "Include a landmark or location description.", "اذكر معلمًا قريبًا أو وصفًا للموقع."],
  ["tipsDescribe", "Describe the pollution type and approximate amount.", "صف نوع التلوث وكميته التقريبية."],
  ["tipsSafe", "Do not enter unsafe water or restricted areas.", "لا تدخل مياهًا غير آمنة أو مناطق محظورة."],
  ["next1", "BlueLoop reviews the report details and evidence.", "تراجع BlueLoop تفاصيل البلاغ والأدلة."],
  ["next2", "Verified reports help identify cleanup priorities.", "تساعد البلاغات المؤكدة في تحديد أولويات التنظيف."],
  ["next3", "Useful submissions can earn reward points.", "يمكن للبلاغات المفيدة كسب نقاط مكافآت."],
  ["findIssue", "Find a pollution issue", "اعثر على مشكلة تلوث"],
  ["sendUseful", "Send a useful report", "أرسل بلاغًا مفيدًا"],
  ["reportChecked", "Report is checked", "تتم مراجعة البلاغ"],
  ["receivePoints", "Receive points", "استلم النقاط"],
  ["rewardText1", "Notice plastic, oil traces, abandoned gear, or other coastal pollution.", "لاحظ البلاستيك أو آثار الزيت أو المعدات المهجورة أو أي تلوث ساحلي آخر."],
  ["rewardText2", "Add location, description, and image evidence for review.", "أضف الموقع والوصف وصور الأدلة للمراجعة."],
  ["rewardText3", "BlueLoop reviews report quality and environmental relevance.", "تراجع BlueLoop جودة البلاغ وصلته البيئية."],
  ["rewardText4", "Verified action earns reward points and campaign recognition.", "العمل المؤكد يكسب نقاط مكافآت وتقديرًا في الحملة."],
  ["impactBannerText", "Every point represents someone paying attention to Bahrain's marine environment and helping partners understand where action is needed.", "كل نقطة تمثل شخصًا يهتم ببيئة البحرين البحرية ويساعد الشركاء على فهم أين يلزم العمل."],
  ["faqAll", "Do all reports earn points?", "هل تكسب كل البلاغات نقاطًا؟"],
  ["faqAllText", "Points are intended for useful, relevant, and clear reports that help BlueLoop understand pollution conditions.", "النقاط مخصصة للبلاغات المفيدة والواضحة وذات الصلة التي تساعد BlueLoop على فهم حالة التلوث."],
  ["faqCampaign", "Can campaign participation earn extra points?", "هل تكسب المشاركة في الحملات نقاطًا إضافية؟"],
  ["faqCampaignText", "Yes. Campaign participation can earn additional points because it supports coordinated community action.", "نعم. يمكن أن تكسب المشاركة في الحملات نقاطًا إضافية لأنها تدعم عملًا مجتمعيًا منظمًا."],
  ["faqEvidence", "Why does evidence matter?", "لماذا الأدلة مهمة؟"],
  ["faqEvidenceText", "Images help verify the report and make cleanup planning more accurate.", "تساعد الصور في تأكيد البلاغ وجعل تخطيط التنظيف أكثر دقة."],
  ["tellUs", "Tell us what you want to discuss and the BlueLoop team will follow up.", "أخبرنا بما تريد مناقشته وسيتابع فريق BlueLoop معك."],
  ["email", "Email", "البريد الإلكتروني"],
  ["partnerships", "Partnerships", "الشراكات"],
  ["manama", "Manama, Bahrain", "المنامة، البحرين"],
  ["bahrainMap", "Bahrain coastal activity map", "خريطة النشاط الساحلي في البحرين"],
  ["successReport", "Report submitted successfully.", "تم إرسال البلاغ بنجاح."],
  ["successMessage", "Message sent successfully.", "تم إرسال الرسالة بنجاح."],
  ["footerHome", "© 2026 BlueLoop. Supporting cleaner seas and healthier marine ecosystems in Bahrain.", "© 2026 BlueLoop. ندعم بحارًا أنظف وأنظمة بحرية أكثر صحة في البحرين."],
  ["footerAbout", "© 2026 BlueLoop. A platform for Bahrain's coastlines and marine life.", "© 2026 BlueLoop. منصة لسواحل البحرين وحياتها البحرية."],
  ["footerProblem", "© 2026 BlueLoop. Turning pollution reports into marine protection action.", "© 2026 BlueLoop. نحول بلاغات التلوث إلى عمل لحماية البحر."],
  ["footerCampaigns", "© 2026 BlueLoop. Campaigns for cleaner waters and stronger environmental action.", "© 2026 BlueLoop. حملات لمياه أنظف وعمل بيئي أقوى."],
  ["footerReport", "© 2026 BlueLoop. Every report helps protect Bahrain's marine environment.", "© 2026 BlueLoop. كل بلاغ يساعد في حماية البيئة البحرية في البحرين."],
  ["footerRewards", "© 2026 BlueLoop. Rewarding action for Life Below Water.", "© 2026 BlueLoop. نكافئ العمل من أجل البحار والحياة البحرية."],
  ["footerData", "© 2026 BlueLoop. Data for cleaner seas and smarter sustainability decisions.", "© 2026 BlueLoop. بيانات لبحار أنظف وقرارات استدامة أذكى."],
  ["footerContact", "© 2026 BlueLoop. Contact us to support cleaner seas in Bahrain.", "© 2026 BlueLoop. تواصل معنا لدعم بحار أنظف في البحرين."]
];

const translations = translationEntries.reduce(
  (all, [key, en, ar]) => {
    all.en[key] = en;
    all.ar[key] = ar;
    return all;
  },
  { en: {}, ar: {} }
);

const translationKeyByEnglish = new Map(translationEntries.map(([key, en]) => [normalizeText(en), key]));
const translatableTextNodes = [];

function setupLanguageSupport() {
  registerTranslatableText();
  registerTranslatableAttributes();
  addLanguageToggle();
  applyLanguage(localStorage.getItem("blueloopLanguage") || "en");
}

function registerTranslatableText() {
  let fallbackCount = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      const text = normalizeText(node.textContent);

      if (!parent || !text || parent.closest("script, style") || isIgnorableText(text)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = normalizeText(node.textContent);
    let key = translationKeyByEnglish.get(text);

    if (!key) {
      key = `autoText${fallbackCount}`;
      fallbackCount += 1;
      translations.en[key] = text;
      translations.ar[key] = createArabicFallback(text);
      translationKeyByEnglish.set(text, key);
    }

    node.parentElement.setAttribute("data-i18n", key);
    translatableTextNodes.push({ node, key });
  }
}

function isIgnorableText(text) {
  return text === "BlueLoop" || /^[\d\s+,%/.:-]+$/.test(text) || text.includes("@");
}

function createArabicFallback(text) {
  if (/^Week\s+\d+$/i.test(text)) {
    return text.replace(/Week/i, "الأسبوع");
  }

  if (/^\+\d+/.test(text) || /^\d/.test(text)) {
    return text.replace("pts", "نقطة").replace("images", "صور").replace("open", "مفتوحة");
  }

  return "معلومات حول مبادرات BlueLoop لحماية البحر في البحرين.";
}

function registerTranslatableAttributes() {
  const attributeTranslations = [
    ["#location", "placeholder", "Beach, coastline, or nearby landmark", "الشاطئ أو الساحل أو معلم قريب"]
  ];

  attributeTranslations.forEach(([selector, attribute, en, ar]) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const key = `attr-${selector}-${attribute}`;
    translations.en[key] = en;
    translations.ar[key] = ar;
    element.setAttribute("data-i18n-attr", `${attribute}:${key}`);
  });
}

function addLanguageToggle() {
  const nav = document.querySelector(".site-header nav");

  if (!nav || nav.querySelector(".language-toggle")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.className = "language-toggle";
  toggle.type = "button";
  toggle.textContent = "EN / AR";
  toggle.setAttribute("aria-label", "Switch language");

  nav.appendChild(toggle);
  toggle.addEventListener("click", () => {
    const currentLanguage = document.documentElement.lang === "ar" ? "ar" : "en";
    applyLanguage(currentLanguage === "ar" ? "en" : "ar");
  });
}

function applyLanguage(language) {
  const selectedLanguage = language === "ar" ? "ar" : "en";
  document.documentElement.lang = selectedLanguage;
  document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", selectedLanguage === "ar");
  localStorage.setItem("blueloopLanguage", selectedLanguage);

  translatableTextNodes.forEach(({ node, key }) => {
    node.textContent = translations[selectedLanguage][key] || translations.en[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const [attribute, key] = element.getAttribute("data-i18n-attr").split(":");
    element.setAttribute(attribute, translations[selectedLanguage][key] || translations.en[key]);
  });

  const toggle = document.querySelector(".language-toggle");
  if (toggle) {
    toggle.classList.toggle("is-arabic", selectedLanguage === "ar");
    toggle.setAttribute("aria-pressed", String(selectedLanguage === "ar"));
  }
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function translateMessage(englishText) {
  const key = translationKeyByEnglish.get(normalizeText(englishText));
  const language = document.documentElement.lang === "ar" ? "ar" : "en";
  return key ? translations[language][key] : englishText;
}

// Highlights the current page link and removes any older hard-coded active state.
function setupActiveNavigation() {
  const currentPage = getCurrentPageName();
  const navLinks = document.querySelectorAll(".site-header nav ul a[href]");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    link.classList.toggle("active", linkPage === currentPage);
  });
}

function getCurrentPageName() {
  const page = window.location.pathname.split("/").pop();
  return page || "index.html";
}

// Adds a responsive hamburger menu without changing the desktop header layout.
function setupMobileNavigation() {
  const nav = document.querySelector(".site-header nav");
  const menu = nav ? nav.querySelector("ul") : null;
  const brand = nav ? nav.querySelector(".brand") : null;

  if (!nav || !menu || !brand || nav.querySelector(".nav-toggle")) {
    return;
  }

  const toggle = document.createElement("button");
  toggle.className = "nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open navigation menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "<span></span><span></span><span></span>";

  brand.insertAdjacentElement("afterend", toggle);

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Reveals sections and important cards when they enter the viewport.
function setupScrollAnimations() {
  const revealItems = document.querySelectorAll(
    "main section, main article, .hero-preview, .dashboard-preview, .dashboard-main-card, .dashboard-side-cards article, .form-panel, .tips-panel, .contact-details"
  );

  revealItems.forEach((item) => item.classList.add("reveal-on-scroll"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

// Animates the homepage impact statistics once the stats section is visible.
function setupStatAnimations() {
  const statSection = document.querySelector(".impact-section");
  const statNumbers = document.querySelectorAll(".stats-grid strong");

  if (!statSection || statNumbers.length === 0) {
    return;
  }

  const animateAllStats = () => {
    statNumbers.forEach((stat) => animateStat(stat));
  };

  if (!("IntersectionObserver" in window)) {
    animateAllStats();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateAllStats();
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(statSection);
}

function animateStat(stat) {
  if (stat.dataset.animated === "true") {
    return;
  }

  stat.dataset.animated = "true";
  const originalText = stat.textContent.trim();
  const statData = parseStatText(originalText);
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(statData.value * easedProgress);

    stat.textContent = formatStatValue(currentValue, statData);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      stat.textContent = originalText;
    }
  }

  requestAnimationFrame(update);
}

function parseStatText(text) {
  const hasK = text.toUpperCase().includes("K");
  const value = Number(text.replace(/,/g, "").replace(/K/i, ""));

  return {
    value: Number.isFinite(value) ? value : 0,
    hasK,
    hasComma: text.includes(",")
  };
}

function formatStatValue(value, statData) {
  if (statData.hasK) {
    return `${value}K`;
  }

  if (statData.hasComma) {
    return value.toLocaleString("en-US");
  }

  return String(value);
}

// Handles the pollution report form on report.html.
function setupReportForm() {
  const form = document.querySelector(".report-page form");

  if (!form) {
    return;
  }

  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormMessages(form);

    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    let isValid = validateRequiredFields(requiredFields);

    if (isValid) {
      showFormStatus(form, translateMessage("Report submitted successfully."), "success");
      form.reset();
    }
  });
}

// Handles the contact form on contact.html.
function setupContactForm() {
  const form = document.querySelector(".contact-page form");

  if (!form) {
    return;
  }

  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormMessages(form);

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");
    let isValid = true;

    if (!name.value.trim()) {
      showFieldError(name, getEmptyMessage("Please enter your name.", "يرجى إدخال اسمك."));
      isValid = false;
    }

    if (!email.value.trim()) {
      showFieldError(email, getEmptyMessage("Please enter your email address.", "يرجى إدخال بريدك الإلكتروني."));
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showFieldError(email, getEmptyMessage("Please enter a valid email address.", "يرجى إدخال بريد إلكتروني صحيح."));
      isValid = false;
    }

    if (!message.value.trim()) {
      showFieldError(message, getEmptyMessage("Please enter your message.", "يرجى إدخال رسالتك."));
      isValid = false;
    }

    if (isValid) {
      showFormStatus(form, translateMessage("Message sent successfully."), "success");
      form.reset();
    }
  });
}

function validateRequiredFields(fields) {
  let isValid = true;

  fields.forEach((field) => {
    if (!field.value.trim()) {
      showFieldError(field, getRequiredMessage(field));
      isValid = false;
    }
  });

  return isValid;
}

function getRequiredMessage(field) {
  const label = document.querySelector(`label[for="${field.id}"]`);
  const fieldName = label ? label.textContent.trim() : "This field";
  if (document.documentElement.lang === "ar") {
    return `يرجى إدخال ${fieldName}.`;
  }
  return `${fieldName} is required.`;
}

function getEmptyMessage(englishMessage, arabicMessage) {
  return document.documentElement.lang === "ar" ? arabicMessage : englishMessage;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearFormMessages(form) {
  form.querySelectorAll(".field-error").forEach((message) => message.remove());
  form.querySelectorAll(".form-status").forEach((message) => message.remove());
  form.querySelectorAll(".field-invalid").forEach((field) => {
    field.classList.remove("field-invalid");
    field.removeAttribute("aria-invalid");
  });
}

function showFieldError(field, message) {
  const error = document.createElement("span");
  error.className = "field-error";
  error.textContent = message;

  field.classList.add("field-invalid");
  field.setAttribute("aria-invalid", "true");
  field.insertAdjacentElement("afterend", error);
}

function showFormStatus(form, message, type) {
  const status = document.createElement("p");
  status.className = `form-status ${type}`;
  status.textContent = message;
  form.prepend(status);
}
