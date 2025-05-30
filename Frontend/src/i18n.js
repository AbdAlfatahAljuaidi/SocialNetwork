// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "hello": "Hello",
        "welcome": "Welcome to our site",
        "Home":"Home",
        "Most Numbers":"Most Numbers",
        "Logout":"Logout",
        "notifications": "Notifications",
        "no_notifications_yet": "No notifications yet",
        "show_more": "Show More",
        "ask_aau": "Ask Students",
         "search_by_poster_name": "Search by poster's name",
         "friends": "Friends",
         "in_your_circle": "In your circle",
         "no_friends_yet": "No friends yet",
          "search_friend": "Search friend",
          "posts": "Posts",
          "official_posts": "Official Posts",
          "chat": "Group Chat",
          "bookmarks": "Bookmarks",
          "my_posts": "My Posts",
          "theme": "Theme",
          "help_feedback": "Help & Feedback",
          "dashboard": "Dashboard",
          "menu": "Menu",
           "language": "Language",
           "loading": "Loading...",
           "whats_on_your_mind": "What's on your mind?",
           "select_question_type": "Select question type",
           "educational_psychological_sciences": "Educational and Psychological Sciences",
           "business": "Business",
           "law": "Law",
           "information_technology": "Information Technology",
           "arts_sciences": "Arts and Sciences",
           "aviation_sciences": "Aviation Sciences",
           "View_Profile":"View Profile",
           "pharmacy": "Pharmacy",
           "engineering": "Engineering",
           "applied_medical_sciences": "Applied Medical Sciences",
           "sharia": "Sharia",
           "other": "Other",
           "post": "Post",
           "most_numbers": "Most Numbers",
           "likes": "Likes",
           "comments": "Comments",
           "choose_question_type": "Choose a Question Type",
           "nothing_to_show": "Nothing to show",
           "all": "All",
             "write_a_comment": "Write a Comment...",
  "comment": "Comment",
  "privteChat": "privteChat",
   "commenting": "Commenting...",
   "correct_answer": "Correct Answer",
   "chat_description": "A place for students to connect, share knowledge, and support each other. Stay respectful, be kind, and enjoy the chat!",
   "chat_welcome": "Welcome to the Chat Room!",
   "loading_messages": "Loading messages...",
   "send_your_message": "Send your message...",
   "send": "Send",
   "loading_more_messages": "Loading more messages...",
   "someone_is_typing": "Someone is typing...",
   "customize_theme": "Customize Your Theme",
   "color_preview_text": "The text will change depending on the selected color.",
   "go_back_with_style": "Go Back with Style",
   "your_posts": "Your Posts",
   "no_posts_yet": "You have not posted anything yet.",
   "saved_bookmarks": "Saved Bookmarks",
   "no_bookmarks": "No bookmarks saved yet.",
   "suggestion_complaint_form": "Suggestion and Complaint Form",
   "issue_type": "Issue Type",
   "select_issue_type": "Select Issue Type",
   "suggestion": "Suggestion",
   "complaint": "Complaint",
   "title": "Title",
   "enter_title_here": "Enter the title here...",
   "details": "Details",
   "enter_details_here": "Enter your details here...",
   "submitting": "Submitting...",
   "submit": "Submit",
   "about_image_alt": "About Ask Students",
   "about_ask_aau": "About Ask Students",
   "empowering_students": "Empowering Students Through",
   "knowledge_collaboration": "Knowledge & Collaboration.",
   "platform_description": "Ask Students is a platform designed to facilitate student discussions, knowledge sharing, and academic support, making university life more engaging and collaborative.",
   "connect_students": "Connect Students",
   "peer_learning": "Peer Learning",
   "simplify_interaction": "Simplify Interaction",
   "reliable_solutions": "Reliable Solutions",
   "campus_communication": "Campus Communication",
   "student_engagement": "Student Engagement",
   "learn_more": "Learn More",
   "students_connected": "Students Connected",
   "questions_asked": "Questions Asked",
   "answers_provided": "Answers Provided",
   "join_now": "Join Now",
   "call_to_action_paragraph": "Join the Ask Students platform for collaborative learning, where students can share knowledge and engage in meaningful discussions.",
   "need_help": "Need Help to Join?",
   "need_help_paragraph": "Get started now by joining the Ask Students platform, where you can ask questions, provide answers, and collaborate with your peers."
 ,
   "slide1": {
    "title": "ASK Students Platform",
    "heading": "Collaboration empowers students",
    "subtitle": "We provide the best platform for university discussions",
    "button": "Learn More"
  },
  "slide2": {
    "title": "ASK Students Community",
    "heading": "Engage, Learn, and Grow",
    "subtitle": "A platform for students to share and gain knowledge",
    "button": "Learn More"
  },
  "slide3": {
    "title": "ASK Students Network",
    "heading": "Connect, Ask, Succeed",
    "subtitle": "Your gateway to student collaboration and insights",
    "button": "Learn More"
  },

  "navbar": {
    "home": "Home",
    "about": "About",
    "service": "Service",
    "approach": "Approach",
    "opinion": "Opinion",
    "contact": "Contact",
    "register": "Register"
  },

  "services": "Services",
  "enhancing_student_learning": "Enhancing Student Learning",
  "with_ask_aau": "with Ask Students",
  "ask_aau_description": "Ask Students provides a dynamic platform for students to ask questions, share knowledge, and collaborate effectively to enhance their academic experience.",
  "our_approach": "Our Approach",
"step_by_step_process": "Step-by-Step Process",
"approach_description": "At Ask Students, we follow a clear and structured process to connect students and enhance learning.",
"post_question": "Post Your Question",
"post_question_description": "Students can post their academic questions on the platform, ensuring a space for collaborative learning.",
"collaborate_learn": "Collaborate & Learn",
"collaborate_learn_description": "Engage with other students' questions, share knowledge, and help others solve academic challenges.",
"gain_knowledge": "Gain Knowledge",
"gain_knowledge_description": "Access valuable insights from your peers, enriching your academic journey with practical answers.",
"why_choose": "Why Choose Ask Students?",
"enhancing": "Enhancing",
"your_learning_experience": "Your Learning Experience",
"ask_answer_title": "Ask & Answer",
"ask_answer_desc": "Engage with a community of students to ask questions and provide answers in a supportive environment.",

"step_by_step": "Step-by-Step",
"process": "Process",
"approach_desc": "At Ask Students, we follow a clear and structured process to connect students and enhance learning.",
"step1_title": "Post Your Question",
"step1_desc": "Students can post their academic questions on the platform, ensuring a space for collaborative learning.",
"step2_title": "Collaborate & Learn",
"step2_desc": "Engage with other students' questions, share knowledge, and help others solve academic challenges.",
"step3_title": "Gain Knowledge",
"step3_desc": "Access valuable insights from your peers, enriching your academic journey with practical answers.",

"why_choose_desc": "Ask Students provides a collaborative space where students can engage, learn, and share knowledge effortlessly.",
"card1_title": "Ask & Answer",
"card1_desc": "Engage with a community of students to ask questions and provide answers in a supportive environment.",
"card2_title": "Collaborate & Learn",
"card2_desc": "Work together with fellow students on projects, assignments, and academic discussions.",
"card3_title": "Stay Connected",
"card3_desc": "Build a strong academic network and stay up to date with the latest discussions and topics.",
"client_reviews": "Client Reviews",
"what_students": "What Students",
"think_about_us": "Think About Us",
"reviews_description": "Explore our Students' honest opinions about the services we offer. Your satisfaction is our priority!",

"contact_section_small_title": "For complaints and suggestions",
"contact_section_main_title": "You can contact us through",
"contact_description": "We always listen to your suggestions, and if you have any complaints, we will definitely work on resolving them because your opinion matters to us.",
"contact_address_label": "Office Address",
"Address":"Address",
"contact_address_value": "Jordan Amman",
"contact_email_label": "Email Address",
"contact_email_value": "abdalfatah.aljuaidi@gmail.com",
"contact_phone_label": "Phone Number",
"contact_phone_value": "+962-78240-7533",
"Personal_Info":"Personal Info",

"Report":"Report",

"send_opinion_title":  "Send your opinion",
"name_placeholder": "Name",
"email_placeholder":  "Email",
"phone_placeholder": "Phone",
"age_placeholder": "Age",
"comment_placeholder": "Your Opinion ",
"send_button": "Send",

"profile": {
  "myProfile": "My Profile",
  "edit": "Edit",
  "noImage": "No Image",
  "points": "Points",
  "loadingProfile": "Loading profile...",
  "personalInfo": "Personal Info",
  "major": "Major",
  "gender": "Gender",
  "phone": "Phone",
  "age": "Age",
  "firstYear": "First Year",
  "na": "N/A",
  "notSpecified": "Not specified",
  "loadingPersonalInfo": "Loading personal information..."
},




"friendsProfile": {
  "title": "Friends",
  "noImage": "No Image",
  "empty": "You don't have any friends yet."
},

"footer": {
  "askAAU": "Ask Students",
  "description": "A platform for students to ask and answer academic questions, fostering interaction and support.",
  "followUs": "Follow Us",
  "quickLinks": "Quick Links",
  "popularPost": "Popular Post",
  "contactInfo": "Contact Info",
  "location": "Location",
  "email": "Email",
  "phone": "Phone",
  "privacyPolicy": "Privacy Policy",
  "termsAndConditions": "Terms & Conditions",
  "copyright": "© 2022 All Rights Reserved.",
  "busTimes": "how can i improve me programing skills ",
  "lectureDates": "what is the best way to study"
},


"login": {
  "title": "Login",
  "email": "Email",
  "password": "Password",
  "remember": "Remember me",
  "forgot": "Forgot Password?",
  "login": "Login",
  "logging": "Logging in...",
  "noAccount": "Don't have an account?",
  "register": "Register"
},

"register": {
  "title": "Create Account",
  "username": "Username",
  "email": "Email",
  "password": "Password",
  "register": "Register",
  "registering": "Registering...",
  "alreadyHaveAccount": "Already have an account?",
  "login": "Login"
},

"settings": {
  "title": "Settings",
  "editInfo": "Edit Profile Info",
  "editButton": "Edit",
  "changePassword": "Change Password",
  "resetPasswordButton": "Reset Password",
  "changeColor": "Change Main Color",
  "deleteAccount": "Delete Account",
  "deleteButton": "Delete",
  "loading": "Loading profile..."
},


"sidebar": {
  "myProfile": "My Profile",
  "suggestions": "Suggestions",
  "friends": "Friends",
  "settings": "Settings"
},


"suggestions": {
  "title": "Suggestions and Complaints",
  "empty": "No suggestions or complaints yet.",
  "types": {
    "suggestion": "Suggestion",
    "complaint": "Complaint"
  },
  "status": {
    "Pending": "Pending",
    "In Progress": "In Progress",
    "Resolved": "Resolved",
    "Completed": "Completed",
    "Rejected": "Rejected"
  }
},
  


      }
    },
    ar: {
      translation: {
        "hello": "مرحباً",
        "welcome": "مرحباً بك في موقعنا",
        "Home":"الصفحة الرئيسة",
        "Most Numbers":"اعلى الارقام",
        "Logout":"تسجيل الخروج",
        "notifications": "الإشعارات",
        "no_notifications_yet": "لا توجد إشعارات بعد",
        "show_more": "عرض المزيد",
        "ask_aau": "اسأل طلاب ",
        "search_by_poster_name": "البحث باسم الناشر",
        "friends": "الأصدقاء",
        "in_your_circle": "ضمن دائرتك",
        "no_friends_yet": "لا يوجد أصدقاء بعد",
        "search_friend": "البحث عن صديق",
        "posts": "المنشورات",
        "official_posts": "المنشورات الرسمية",
        "chat": "  الدردشة الجماعية ",
        "bookmarks": "المحفوظات",
        "my_posts": "منشوراتي",
        "theme": "السمة",
        "help_feedback": "المساعدة والملاحظات",
        "dashboard": "لوحة التحكم",
        "menu": "القائمة",
         "language": "اللغة",
         "loading": "جارٍ التحميل...",
         "whats_on_your_mind": "ماذا يدور في ذهنك؟",
         "select_question_type": "اختر نوع السؤال",
         "educational_psychological_sciences": "العلوم التربوية والنفسية",
         "business": "الأعمال",
         "law": "القانون",
         "information_technology": "تقنية المعلومات",
         "arts_sciences": "الآداب والعلوم",
         "aviation_sciences": "علوم الطيران",
         "pharmacy": "الصيدلة",
         "engineering": "الهندسة",
         "applied_medical_sciences": "العلوم الطبية التطبيقية",
         "sharia": "الشريعة",
         "other": "أخرى",
         "post": "نشر",
         "most_numbers": "أعلى الأرقام",
         "likes": "الإعجابات",
         "comments": "التعليقات",  "choose_question_type": "اختر نوع السؤال",
         "nothing_to_show": "لا يوجد ما يعرض",
         "all": "الكل",
           "write_a_comment": "اكتب تعليق...",
  "comment": "تعليق",
  "privteChat":"محادثة",
  "Report":"ابلاغ",
   "commenting": "جاري إرسال التعليق...",
   "correct_answer": "الإجابة الصحيحة",
   "chat_description": "مكان للطلاب للتواصل، وتبادل المعرفة، ودعم بعضهم البعض. كن محترمًا، لطيفًا، واستمتع بالدردشة!",
   "chat_welcome": "مرحبًا بك في غرفة الدردشة!",
   "loading_messages": "جاري تحميل الرسائل...",
   "send_your_message": "أرسل رسالتك...",
   "send": "إرسال",
   "loading_more_messages": "جارٍ تحميل المزيد من الرسائل...",
   "someone_is_typing": "شخص ما يكتب...",
   "customize_theme": "خصص المظهر",
   "color_preview_text": "النص سيتغير حسب اللون المختار.",
   "go_back_with_style": "العودة بالأناقة",
   "your_posts": "منشوراتك",
   "no_posts_yet": "لم تقم بنشر أي شيء بعد.",
   "saved_bookmarks": "المفضلة المحفوظة",
   "no_bookmarks": "لم تقم بحفظ أي مفضلات بعد.",
   "suggestion_complaint_form": "نموذج الاقتراحات والشكاوى",
   "issue_type": "نوع المشكلة",
   "select_issue_type": "حدد نوع المشكلة",
   "suggestion": "اقتراح",
   "complaint": "شكوى",
   "View_Profile":"عرض الملف الشخصي ",
   "title": "العنوان",
   "enter_title_here": "أدخل العنوان هنا...",
   "details": "التفاصيل",
   "enter_details_here": "أدخل التفاصيل هنا...",
   "submitting": "جاري التقديم...",
   "submit": "تقديم",
   "about_image_alt": "عن منصة Ask Students",
   "about_ask_aau": "عن منصة Ask Students",
   "empowering_students": "تمكين الطلاب من خلال",
   "knowledge_collaboration": "المعرفة والتعاون.",
   "platform_description": "منصة Ask Students مصممة لتسهيل مناقشات الطلاب، ومشاركة المعرفة، والدعم الأكاديمي، مما يجعل الحياة الجامعية أكثر تفاعلاً وتعاوناً.",
   "connect_students": "ربط الطلاب",
   "peer_learning": "التعلم بين الأقران",
   "simplify_interaction": "تبسيط التفاعل",
   "reliable_solutions": "حلول موثوقة",
   "campus_communication": "التواصل الجامعي",
   "student_engagement": "مشاركة الطلاب",
   "learn_more": "اعرف المزيد",

   "slide1": {
    "title": "منصة ASK Students",
    "heading": "التعاون يمكّن الطلاب",
    "subtitle": "نوفر أفضل منصة للنقاشات الجامعية",
    "button": "تعرف على المزيد"
  },
  "slide2": {
    "title": "مجتمع ASK Students",
    "heading": "شارك، تعلّم، وتطوّر",
    "subtitle": "منصة للطلاب لتبادل واكتساب المعرفة",
    "button": "تعرف على المزيد"
  },
  "slide3": {
    "title": "شبكة ASK Students",
    "heading": "تواصل، اسأل، وانجح",
    "subtitle": "بوابتك للتعاون الطلابي والمشاركة",
    "button": "تعرف على المزيد"
  },

  "navbar": {
    "home": "الرئيسية",
    "about": "حول",
    "service": "الخدمات",
    "approach": "المنهج",
    "opinion": "الآراء",
    "contact": "اتصل بنا",
    "register": "تسجيل"
  },

  "login": {
    "title": "تسجيل الدخول",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "remember": "تذكرني",
    "forgot": "نسيت كلمة المرور؟",
    "login": "تسجيل الدخول",
    "logging": "جارٍ تسجيل الدخول...",
    "noAccount": "ليس لديك حساب؟",
    "register": "إنشاء حساب"
  },

  "students_connected": "طلاب متصلين",
  "questions_asked": "أسئلة مطروحة",
  "answers_provided": "إجابات مقدمة",
  "join_now": "انضم الآن",
  "call_to_action_paragraph": "انضم إلى منصة Ask Students للتعلم التعاوني، حيث يمكن للطلاب مشاركة المعرفة والمشاركة في نقاشات مفيدة.",
  "need_help": "تحتاج إلى مساعدة للانضمام؟",
  "need_help_paragraph": "ابدأ الآن من خلال الانضمام إلى منصة Ask Students، حيث يمكنك طرح الأسئلة وتقديم الإجابات والتعاون مع زملائك.",
  "services": "الخدمات",
  "enhancing_student_learning": "تعزيز تعلم الطلاب",
  "with_ask_aau": "مع Ask Students",
  "ask_aau_description": "يوفر Ask Students منصة ديناميكية للطلاب لطرح الأسئلة، ومشاركة المعرفة، والتعاون بشكل فعال لتعزيز تجربتهم الأكاديمية.",
  "our_approach": "نهجنا",
"step_by_step_process": "عملية خطوة بخطوة",
"approach_description": "في Ask Students، نتبع عملية واضحة ومنظمة لربط الطلاب وتعزيز التعلم.",
"post_question": "اطرح سؤالك",
"post_question_description": "يمكن للطلاب نشر أسئلتهم الأكاديمية على المنصة لضمان بيئة تعلم تعاوني.",
"collaborate_learn": "تعاون وتعلم",
"collaborate_learn_description": "شارك في أسئلة الطلاب الآخرين، وشارك المعرفة، وساعد في حل التحديات الأكاديمية.",
"gain_knowledge": "اكتسب المعرفة",
"gain_knowledge_description": "احصل على رؤى قيمة من زملائك، تعزز رحلتك الأكاديمية بإجابات عملية.",
"why_choose": "لماذا تختار Ask Students؟",
"enhancing": "تعزيز",
"your_learning_experience": "تجربتك التعليمية",
"ask_answer_title": "اسأل وأجب",
"ask_answer_desc": "تفاعل مع مجتمع الطلاب لطرح الأسئلة وتقديم الإجابات في بيئة داعمة.",
"step_by_step": "خطوة بخطوة",
"process": "العملية",
"approach_desc": "في Ask Students، نتبع عملية واضحة ومنظمة لربط الطلاب وتعزيز التعلم.",
"step1_title": "انشر سؤالك",
"step1_desc": "يمكن للطلاب نشر أسئلتهم الأكاديمية على المنصة، مما يوفر مساحة للتعلم التعاوني.",
"step2_title": "تعاون وتعلم",
"step2_desc": "تفاعل مع أسئلة الطلاب الآخرين، وشارك معرفتك، وساعد في حل التحديات الأكاديمية.",
"step3_title": "اكسب المعرفة",
"step3_desc": "احصل على رؤى قيمة من زملائك الطلاب، وطور تجربتك الأكاديمية من خلال إجابات عملية.",

"why_choose_desc": "يوفر Ask Students مساحة تعاونية يمكن للطلاب من خلالها التفاعل، والتعلم، ومشاركة المعرفة بسهولة.",
"card1_title": "اسأل وأجب",
"card1_desc": "تفاعل مع مجتمع من الطلاب لطرح الأسئلة وتقديم الإجابات في بيئة داعمة.",
"card2_title": "تعاون وتعلم",
"card2_desc": "اعمل مع زملائك الطلاب في المشاريع والواجبات والمناقشات الأكاديمية.",
"card3_title": "ابقَ على اتصال",
"card3_desc": "كوّن شبكة أكاديمية قوية وابقَ على اطلاع بأحدث المناقشات والمواضيع.",
"Address":"العنوان",
"client_reviews": "مراجعات العملاء",
"what_students": "ماذا يظن",
"think_about_us": "الطلاب عنا",
"reviews_description": "استكشف آراء طلابنا الصادقة حول الخدمات التي نقدمها. رضاك هو أولويتنا!",

"reviews_title": "آراء الطلاب",
"reviews_heading": "{{students}} ماذا يقول طلابنا عنا؟",

"contact_section_small_title": "للشكاوى والمقترحات",
"contact_section_main_title": "يمكنك التواصل معنا من خلال",
"contact_description": "نحن دائمًا نستمع إلى اقتراحاتكم، وإذا كانت لديكم أي شكاوى، فسنعمل بالتأكيد على حلها لأن رأيكم يهمنا.",
"contact_address_label": "عنوان المكتب",
"contact_address_value": "جامعة عمان العربية",
"contact_email_label": "البريد الإلكتروني",
"contact_email_value": "abdalfatah.aljuaidi@gmail.com",
"contact_phone_label": "رقم الموبايل",
"contact_phone_value": "+962-78240-7533",
"send_opinion_title": "أرسل رأيك",
"name_placeholder": "الاسم",
"email_placeholder": "البريد الإلكتروني",
"phone_placeholder": "الهاتف",
"age_placeholder": "العمر",
"comment_placeholder": "رسالتك",
"send_button": "إرسال",
"Profile":"الملف الشخصي",
"Personal_Info":"معلومات شخصية",

"footer": {
  "askAAU": "اسأل Students",
  "description": "منصة للطلاب لطرح والإجابة على الأسئلة الأكاديمية، مما يعزز التفاعل والدعم.",
  "followUs": "تابعنا",
  "quickLinks": "روابط سريعة",
  "popularPost": "أكثر المنشورات شيوعًا",
  "contactInfo": "معلومات الاتصال",
  "location": "الموقع",
  "email": "البريد الإلكتروني",
  "phone": "الهاتف",
  "privacyPolicy": "سياسة الخصوصية",
  "termsAndConditions": "الشروط والأحكام",
  "copyright": "© 2022 جميع الحقوق محفوظة.",
    "busTimes": " كيف ممكن اطور حالي بالبرمجة",
    "lectureDates": "ايش افضل طريقة للدراسة",
  
},


"settings": {
  "title": "الإعدادات",
  "editInfo": "تعديل معلومات الملف الشخصي",
  "editButton": "تعديل",
  "changePassword": "تغيير كلمة المرور",
  "resetPasswordButton": "إعادة تعيين كلمة المرور",
  "changeColor": "تغيير اللون الرئيسي",
  "deleteAccount": "حذف الحساب",
  "deleteButton": "حذف",
  "loading": "جارٍ تحميل الملف الشخصي..."
},


"sidebar": {
  "myProfile": "ملفي الشخصي",
  "suggestions": "الاقتراحات",
  "friends": "الأصدقاء",
  "settings": "الإعدادات"
},


"profile": {
  "myProfile": "ملفي الشخصي",
  "edit": "تعديل",
  "noImage": "لا توجد صورة",
  "points": "النقاط",
  "loadingProfile": "جارٍ تحميل الملف الشخصي...",
  "personalInfo": "المعلومات الشخصية",
  "major": "التخصص",
  "gender": "الجنس",
  "phone": "الهاتف",
  "age": "العمر",
  "firstYear": " سنة التسجيل",
  "na": "غير متوفر",
  "notSpecified": "غير محدد",
  "loadingPersonalInfo": "جارٍ تحميل المعلومات الشخصية..."
},



"friendsProfile": {
  "title": "الأصدقاء",
  "noImage": "لا توجد صورة",
  "empty": "ليس لديك أصدقاء بعد."
},

"register": {
  "title": "إنشاء حساب",
  "username": "اسم المستخدم",
  "email": "البريد الإلكتروني",
  "password": "كلمة المرور",
  "register": "تسجيل",
  "registering": "جارٍ التسجيل...",
  "alreadyHaveAccount": "هل لديك حساب؟",
  "login": "تسجيل الدخول"
},


"suggestions": {
  "title": "الاقتراحات والشكاوى",
  "empty": "لا توجد اقتراحات أو شكاوى بعد.",
  "types": {
    "suggestion": "اقتراح",
    "complaint": "شكوى"
  },
  "status": {
    "Pending": "قيد المراجعة",
    "Resolved": "تم الحل",
    "Rejected": "مرفوض"
  }
},


      }
    }
  },
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "en", // في حال لم تكن اللغة موجودة
  interpolation: {
    escapeValue: false // React already safes from xss
  }
});

export default i18n;



