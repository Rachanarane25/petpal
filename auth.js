/*
  auth.js - Global Supabase Authentication, Translation & Chatbot Helper
  Handles:
  - Auth (Login, Logout, Profile Avatar)
  - Multi-language translation
  - Toast notifications
  - Floating AI Chatbot logic
*/

// --- 1. TRANSLATION LOGIC ---
const translations = {
  en: {
    title_home: "PetVerse 🐾 | Adopt. Love. Repeat.",
    logo_name: "PetVerse 🐾",
    nav_home: "Home",
    nav_adopt: "Adopt",
    nav_volunteer: "Volunteer",
    nav_donate: "Donate",
    nav_community: "Community",
    nav_lost_found: "Lost & Found",
    nav_login: "Login / Signup",
    nav_my_adoptions: "My Adoptions",
    nav_logout: "Logout",
    hero_title: "Welcome to PetVerse!",
    hero_subtitle: "Where every pet finds a loving home and every home finds its perfect companion",
    adopt_title: "Adopt a Pet",
    adopt_desc: "Find your perfect furry friend.",
    adopt_btn: "Browse Pets",
    volunteer_title: "Volunteer",
    volunteer_desc: "Help care for animals in need.",
    volunteer_btn: "Get Involved",
    donate_title: "Support",
    donate_desc: "Donate to save more lives.",
    donate_btn: "Donate Now",
    community_title: "Community",
    community_desc: "Chat with pet lovers worldwide.",
    community_btn: "Join Community",
    lost_title: "Lost & Found",
    lost_desc: "Help reunite lost pets.",
    lost_btn: "View Reports",
    my_adopt_title: "My Adoptions",
    my_adopt_desc: "Track all pets you’ve adopted.",
    my_adopt_btn: "View My Pets",
    footer_text: "© 2025 PetVerse — Adopt. Love. Care. 🐾",
    title_adopt: "Adopt a Pet | PetVerse",
    adopt_page_title: "Find your perfect companion 🐶🐱",
    adopt_page_sub: "Browse pets looking for a loving home",
    adopt_form_title: "Adoption Request Form",
    adopt_name_label: "Your Name:",
    adopt_email_label: "Your Email:",
    adopt_petid_label: "Pet ID:",
    adopt_submit_btn: "Submit Request",
    adopt_success: "🎉 Request sent successfully!",
    adopt_error: "⚠️ Something went wrong. Please try again.",
    title_community: "Community | PetVerse",
    community_title: "Community Chat",
    community_subtitle: "Talk with other pet lovers ❤️",
    community_room_title: "Public Chat Room",
    community_room_subtitle: "Chat with other pet owners",
    community_admin: "Admin:",
    community_welcome: "Welcome to PetVerse Community 🐾",
    community_input_placeholder: "Type your message...",
    community_send_btn: "Send",
    donate_title: "Support Our Mission",
    donate_subtitle: "Your donation helps save and shelter animals in need 🐾",
    donate_onetime_title: "One-time Donation",
    donate_onetime_desc: "Support our shelter with a single donation",
    donate_onetime_btn: "Donate Now",
    donate_monthly_title: "Monthly Support",
    donate_monthly_desc: "Become a monthly supporter",
    donate_monthly_btn: "Monthly Giving",
    donate_form_title: "Make a Donation",
    donate_amount_label: "Donation Amount",
    donate_name_label: "Full Name",
    donate_email_label: "Email",
    donate_submit_btn: "Complete Donation",
    title_lost_found: "Lost & Found | PetVerse",
    lost_title: "Lost & Found Pets",
    lost_subtitle: "Help reunite lost pets with their families ❤️",
    lost_form_title: "Report a Lost or Found Pet",
    lost_report_type: "Report Type",
    lost_select_type: "Select type",
    lost_option_lost: "I Lost My Pet",
    lost_option_found: "I Found a Pet",
    lost_pet_name: "Pet Name",
    lost_pet_type: "Pet Type",
    lost_type_dog: "Dog",
    lost_type_cat: "Cat",
    lost_type_bird: "Bird",
    lost_type_rabbit: "Rabbit",
    lost_type_other: "Other",
    lost_breed: "Breed",
    lost_color: "Color",
    lost_location: "Last Seen Location",
    lost_date: "Date Lost/Found",
    lost_contact: "Contact Phone",
    lost_description: "Additional Details",
    lost_placeholder_description: "Describe your pet, distinctive features, collar details, etc.",
    lost_submit_btn: "Submit Report",
    lost_recent_reports: "Recent Reports",
    title_volunteer: "Volunteer | PetVerse",
    volunteer_title: "Become a Volunteer",
    volunteer_subtitle: "Join our community and make a difference in the lives of animals 🐶🐱",
    volunteer_why_title: "Why Volunteer With Us?",
    volunteer_why_desc: "Our volunteers are the heart of PetVerse. Whether you're walking dogs, socializing cats, helping with events, or assisting with admin work, your time truly makes a difference!",
    volunteer_role_care_title: "Animal Care",
    volunteer_role_care_desc: "Feeding, grooming & walks",
    volunteer_role_events_title: "Events",
    volunteer_role_events_desc: "Help with adoption drives",
    volunteer_role_admin_title: "Admin Support",
    volunteer_role_admin_desc: "Data entry, phone & mail",
    volunteer_form_title: "Volunteer Application",
    volunteer_firstname: "First Name",
    volunteer_lastname: "Last Name",
    volunteer_email: "Email",
    volunteer_phone: "Phone",
    volunteer_interest: "Areas of Interest",
    volunteer_interest_care: "Animal Care",
    volunteer_interest_event: "Event Support",
    volunteer_interest_admin: "Administrative",
    volunteer_interest_transport: "Transportation",
    volunteer_submit_btn: "Submit Application",
    title_myadoptions: "My Adoptions | PetVerse",
    myadoptions_title: "My Adopted Pets",
    myadoptions_subtitle: "View all the lovely pets you've given a forever home 🏡",
    myadoptions_loading: "Loading your adoptions...",
    myadoptions_login_needed: "Please Login",
    myadoptions_login_message: "Login to view your adopted pets.",
    myadoptions_login_btn: "Login Now",
    myadoptions_none: "No Adoptions Yet",
    myadoptions_none_message: "You haven't adopted any pets yet. Visit our adoption page to find your new best friend!",
    myadoptions_browse_btn: "Browse Pets",
    myadoptions_age: "Age:",
    myadoptions_desc: "Description:",
    myadoptions_adoptedby: "Adopted by:",
    myadoptions_status: "Status:",
    myadoptions_happy: "Happy in forever home"
  },
  hi: {
    title_home: "PetVerse 🐾 | अपनाएँ। प्यार करें। दोहराएँ।",
    logo_name: "PetVerse 🐾",
    nav_home: "होम",
    nav_adopt: "गोद लें",
    nav_volunteer: "सेवा करें",
    nav_donate: "दान करें",
    nav_community: "समुदाय",
    nav_lost_found: "लॉस्ट & फाउंड",
    nav_login: "लॉगिन / साइनअप",
    nav_my_adoptions: "मेरे गोद लिए पालतू",
    nav_logout: "लॉग आउट",
    hero_title: "PetVerse में आपका स्वागत है!",
    hero_subtitle: "जहाँ हर पालतू को प्यार भरा घर मिलता है।",
    adopt_title: "पालतू को गोद लें",
    adopt_desc: "अपने प्यारे साथी को खोजें।",
    adopt_btn: "पालतू देखें",
    volunteer_title: "स्वयंसेवक",
    volunteer_desc: "ज़रूरतमंद जानवरों की मदद करें।",
    volunteer_btn: "शामिल हों",
    donate_title: "सहयोग",
    donate_desc: "अधिक जीवन बचाने के लिए दान करें।",
    donate_btn: "अभी दान करें",
    community_title: "समुदाय",
    community_desc: "दुनिया भर के पालतू प्रेमियों से बात करें।",
    community_btn: "समुदाय में शामिल हों",
    lost_title: "लॉस्ट & फाउंड",
    lost_desc: "खोए हुए पालतू खोजने में मदद करें।",
    lost_btn: "रिपोर्ट देखें",
    my_adopt_title: "मेरे गोद लिए पालतू",
    my_adopt_desc: "सभी गोद लिए पालतू ट्रैक करें।",
    my_adopt_btn: "मेरे पालतू देखें",
    footer_text: "© 2025 PetVerse — अपनाएँ। प्यार करें। देखभाल करें। 🐾",
    title_adopt: "पालतू जानवर गोद लें | PetVerse",
    adopt_page_title: "अपना परफेक्ट साथी खोजें 🐶🐱",
    adopt_page_sub: "उन पालतुओं को देखें जो प्यार भरे घर की तलाश में हैं",
    adopt_form_title: "गोद लेने का अनुरोध फॉर्म",
    adopt_name_label: "आपका नाम:",
    adopt_email_label: "आपका ईमेल:",
    adopt_petid_label: "पेट आईडी:",
    adopt_submit_btn: "अनुरोध सबमिट करें",
    adopt_success: "🎉 आपका अनुरोध सफलतापूर्वक भेजा गया!",
    adopt_error: "⚠️ कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
    title_community: "समुदाय | PetVerse",
    community_title: "समुदाय चैट",
    community_subtitle: "अन्य पालतू प्रेमियों से बात करें ❤️",
    community_room_title: "सार्वजनिक चैट रूम",
    community_room_subtitle: "अन्य पालतू मालिकों से बातचीत करें",
    community_admin: "प्रशासक:",
    community_welcome: "PetVerse समुदाय में आपका स्वागत है 🐾",
    community_input_placeholder: "अपना संदेश लिखें...",
    community_send_btn: "भेजें",
    donate_title: "हमारे मिशन का समर्थन करें",
    donate_subtitle: "आपका दान ज़रूरतमंद जानवरों की जान बचाने में मदद करता है 🐾",
    donate_onetime_title: "एकमुश्त दान",
    donate_onetime_desc: "एक बार का दान देकर हमारे शेल्टर की मदद करें",
    donate_onetime_btn: "अभी दान करें",
    donate_monthly_title: "मासिक समर्थन",
    donate_monthly_desc: "मासिक दानकर्ता बनें",
    donate_monthly_btn: "मासिक दान",
    donate_form_title: "दान करें",
    donate_amount_label: "दान राशि",
    donate_name_label: "पूरा नाम",
    donate_email_label: "ईमेल",
    donate_submit_btn: "दान पूरा करें",
    title_lost_found: "लॉस्ट एंड फाउंड | PetVerse",
    lost_title: "खोए और मिले पालतू जानवर",
    lost_subtitle: "खोए हुए पालतू जानवरों को उनके परिवार से मिलाने में मदद करें ❤️",
    lost_form_title: "खोए या मिले पालतू की रिपोर्ट करें",
    lost_report_type: "रिपोर्ट का प्रकार",
    lost_select_type: "प्रकार चुनें",
    lost_option_lost: "मेरा पालतू खो गया है",
    lost_option_found: "मुझे एक पालतू मिला है",
    lost_pet_name: "पालतू का नाम",
    lost_pet_type: "पालतू का प्रकार",
    lost_type_dog: "कुत्ता",
    lost_type_cat: "बिल्ली",
    lost_type_bird: "पक्षी",
    lost_type_rabbit: "खरगोश",
    lost_type_other: "अन्य",
    lost_breed: "नस्ल",
    lost_color: "रंग",
    lost_location: "अंतिम देखा गया स्थान",
    lost_date: "खोने/मिलने की तिथि",
    lost_contact: "संपर्क नंबर",
    lost_description: "अतिरिक्त विवरण",
    lost_placeholder_description: "अपने पालतू का विवरण, विशेष पहचान या कॉलर की जानकारी दें।",
    lost_submit_btn: "रिपोर्ट जमा करें",
    lost_recent_reports: "हाल की रिपोर्टें",
    title_volunteer: "स्वयंसेवक | PetVerse",
    volunteer_title: "स्वयंसेवक बनें",
    volunteer_subtitle: "हमारे समुदाय से जुड़ें और जानवरों के जीवन में बदलाव लाएँ 🐶🐱",
    volunteer_why_title: "हमारे साथ स्वयंसेवा क्यों करें?",
    volunteer_why_desc: "हमारे स्वयंसेवक PetVerse का दिल हैं। चाहे आप कुत्तों को घुमा रहे हों, बिल्लियों से मेलजोल बढ़ा रहे हों, कार्यक्रमों में मदद कर रहे हों या प्रशासनिक कार्य में सहयोग कर रहे हों — आपका समय एक बदलाव लाता है!",
    volunteer_role_care_title: "पशु देखभाल",
    volunteer_role_care_desc: "खिलाना, संवारना और टहलाना",
    volunteer_role_events_title: "कार्यक्रम",
    volunteer_role_events_desc: "गोद लेने के कार्यक्रमों में मदद करें",
    volunteer_role_admin_title: "प्रशासनिक सहयोग",
    volunteer_role_admin_desc: "डेटा एंट्री, फोन और मेल",
    volunteer_form_title: "स्वयंसेवक आवेदन पत्र",
    volunteer_firstname: "पहला नाम",
    volunteer_lastname: "अंतिम नाम",
    volunteer_email: "ईमेल",
    volunteer_phone: "फ़ोन",
    volunteer_interest: "रुचि के क्षेत्र",
    volunteer_interest_care: "पशु देखभाल",
    volunteer_interest_event: "कार्यक्रम सहायता",
    volunteer_interest_admin: "प्रशासनिक",
    volunteer_interest_transport: "परिवहन",
    volunteer_submit_btn: "आवेदन जमा करें",
    title_myadoptions: "मेरी गोद लिए गए पालतू | PetVerse",
    myadoptions_title: "मेरे गोद लिए गए पालतू",
    myadoptions_subtitle: "सभी प्यारे पालतुओं को देखें जिन्हें आपने हमेशा के लिए घर दिया है 🏡",
    myadoptions_loading: "आपकी गोद लेने की जानकारी लोड हो रही है...",
    myadoptions_login_needed: "कृपया लॉगिन करें",
    myadoptions_login_message: "अपने गोद लिए गए पालतू जानवर देखने के लिए लॉगिन करें।",
    myadoptions_login_btn: "अभी लॉगिन करें",
    myadoptions_none: "अभी तक कोई गोद नहीं लिया गया",
    myadoptions_none_message: "आपने अभी तक कोई पालतू गोद नहीं लिया है। हमारे दत्तक पेज पर जाएं और अपने नए दोस्त को खोजें!",
    myadoptions_browse_btn: "पालतू देखें",
    myadoptions_age: "आयु:",
    myadoptions_desc: "विवरण:",
    myadoptions_adoptedby: "गोद लिया गया द्वारा:",
    myadoptions_status: "स्थिति:",
    myadoptions_happy: "हमेशा के लिए घर में खुश 🏡"
  },
  kn: {
    title_home: "PetVerse 🐾 | ದತ್ತು. ಪ್ರೀತಿ. ಪುನರಾವರ್ತಿ.",
    logo_name: "PetVerse 🐾",
    nav_home: "ಮುಖಪುಟ",
    nav_adopt: "ದತ್ತು ಪಡೆಯಿರಿ",
    nav_volunteer: "ಸ್ವಯంಸೇವಕ",
    nav_donate: "ದೇಣಿಗೆ ನೀಡಿ",
    nav_community: "ಸಮುದಾಯ",
    nav_lost_found: "ಲಾಸ್ಟ್ & ಫೌಂಡ್",
    nav_login: "ಲಾಗಿನ್ / ಸೈನ್‌ಅಪ್",
    nav_my_adoptions: "ನನ್ನ ದತ್ತು ಪಶುಗಳು",
    nav_logout: "ಲಾಗ್ ಔಟ್",
    hero_title: "PetVerse ಗೆ ಸ್ವಾಗತ!",
    hero_subtitle: "ಪ್ರತಿ ಪಶುವಿಗೂ ಪ್ರೀತಿಯ ಮನೆಯ ಹುಡುಕಾಟ.",
    adopt_title: "ಪಶುವನ್ನು ದತ್ತು ಪಡೆಯಿರಿ",
    adopt_desc: "ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ಜಾನವಾರು ಸ್ನೇಹಿತನನ್ನು ಹುಡುಕಿ.",
    adopt_btn: "ಪಶುಗಳನ್ನು ನೋಡಿ",
    volunteer_title: "ಸ್ವಯಂಸೇವಕ",
    volunteer_desc: "ಅವಶ್ಯಕತೆ ಇರುವ ಪ್ರಾಣಿಗಳಿಗೆ ಸಹಾಯ ಮಾಡಿ.",
    volunteer_btn: "ಭಾಗವಹಿಸಿ",
    donate_title: "ಬೆಂಬಲ",
    donate_desc: "ಹೆಚ್ಚು ಜೀವಗಳನ್ನು ಉಳಿಸಲು ದೇಣಿಗೆ ನೀಡಿ.",
    donate_btn: "ಈಗ ದೇಣಿಗೆ ನೀಡಿ",
    community_title: "ಸಮುದಾಯ",
    community_desc: "ವಿಶ್ವದ ಪಶು ಪ್ರಿಯರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ.",
    community_btn: "ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ",
    lost_title: "ಲಾಸ್ಟ್ & ಫೌಂಡ್",
    lost_desc: "ಕಳೆದು ಹೋದ ಪಶುಗಳನ್ನು ಹುಡುಕಲು ಸಹಾಯ ಮಾಡಿ.",
    lost_btn: "ವರದಿಗಳನ್ನು ನೋಡಿ",
    my_adopt_title: "ನನ್ನ ದತ್ತು ಪಶುಗಳು",
    my_adopt_desc: "ನೀವು ದತ್ತು ಪಡೆದ ಎಲ್ಲಾ ಪಶುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
    my_adopt_btn: "ನನ್ನ ಪಶುಗಳನ್ನು ನೋಡಿ",
    footer_text: "© 2025 PetVerse — ದತ್ತು. ಪ್ರೀತಿ. ಕಾಳಜಿ. 🐾",
    title_adopt: "ಪ್ರಾಣಿಯನ್ನು ದತ್ತು ಪಡೆಯಿರಿ | PetVerse",
    adopt_page_title: "ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ಸಂಗಾತಿಯನ್ನು ಹುಡುಕಿ 🐶🐱",
    adopt_page_sub: "ಪ್ರೀತಿಯ ಮನೆಗಾಗಿ ಕಾಯುತ್ತಿರುವ ಪೆಟ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
    adopt_form_title: "ದತ್ತು ಪಡೆಯುವ ವಿನಂತಿ ಫಾರ್ಮ್",
    adopt_name_label: "ನಿಮ್ಮ ಹೆಸರು:",
    adopt_email_label: "ನಿಮ್ಮ ಇಮೇಲ್:",
    adopt_petid_label: "ಪೆಟ್ ಐಡಿ:",
    adopt_submit_btn: "ವಿನಂತಿ ಸಲ್ಲಿಸಿ",
    adopt_success: "🎉 ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!",
    adopt_error: "⚠️ ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    title_community: "ಸಮುದಾಯ | PetVerse",
    community_title: "ಸಮುದಾಯ ಚಾಟ್",
    community_subtitle: "ಇತರ ಪಶು ಪ್ರಿಯರೊಂದಿಗೆ ಮಾತನಾಡಿ ❤️",
    community_room_title: "ಸಾರ್ವಜನಿಕ ಚಾಟ್ ರೂಮ್",
    community_room_subtitle: "ಇತರ ಪಶು ಮಾಲೀಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    community_admin: "ನಿರ್ವಾಹಕರು:",
    community_welcome: "PetVerse ಸಮುದಾಯಕ್ಕೆ ಸ್ವಾಗತ 🐾",
    community_input_placeholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    community_send_btn: "ಕಳುಹಿಸಿ",
    donate_title: "ನಮ್ಮ ಮಿಷನ್‌ಗೆ ಬೆಂಬಲ ನೀಡಿ",
    donate_subtitle: "ನಿಮ್ಮ ದೇಣಿಗೆ ಅಗತ್ಯವಿರುವ ಪ್ರಾಣಿಗಳನ್ನು ಉಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ 🐾",
    donate_onetime_title: "ಒಮ್ಮೆ ದೇಣಿಗೆ",
    donate_onetime_desc: "ಒಮ್ಮೆ ದೇಣಿಗೆ ನೀಡಿ ನಮ್ಮ ಆಶ್ರಯಕ್ಕೆ ಬೆಂಬಲ ನೀಡಿ",
    donate_onetime_btn: "ಈಗ ದೇಣಿಗೆ ನೀಡಿ",
    donate_monthly_title: "ಮಾಸಿಕ ಬೆಂಬಲ",
    donate_monthly_desc: "ಮಾಸಿಕ ದೇಣಿಗಾದಾರರಾಗಿ",
    donate_monthly_btn: "ಮಾಸಿಕ ದೇಣಿಗೆ",
    donate_form_title: "ದೇಣಿಗೆ ನೀಡಿ",
    donate_amount_label: "ದೇಣಿಗೆ ಮೊತ್ತ",
    donate_name_label: "ಪೂರ್ಣ ಹೆಸರು",
    donate_email_label: "ಇಮೇಲ್",
    donate_submit_btn: "ದೇಣಿಗೆ ಪೂರ್ಣಗೊಳಿಸಿ",
    title_lost_found: "ಲಾಸ್ಟ್ ಮತ್ತು ಫೌಂಡ್ | PetVerse",
    lost_title: "ಕಳೆದುಹೋದ ಮತ್ತು ಕಂಡುಬಂದ ಪಶುಗಳು",
    lost_subtitle: "ಕಳೆದುಹೋದ ಪಶುಗಳನ್ನು ಅವರ ಕುಟುಂಬಗಳೊಂದಿಗೆ ಪುನಃ ಸೇರ್ಪಡೆಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡಿ ❤️",
    lost_form_title: "ಕಳೆದುಹೋದ ಅಥವಾ ಕಂಡುಬಂದ ಪಶುವಿನ ವರದಿ",
    lost_report_type: "ವರದಿ ಪ್ರಕಾರ",
    lost_select_type: "ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    lost_option_lost: "ನನ್ನ ಪಶು ಕಳೆದುಹೋಯಿತು",
    lost_option_found: "ನಾನು ಒಂದು ಪಶುವನ್ನು ಕಂಡುಹಿಡಿದಿದ್ದೇನೆ",
    lost_pet_name: "ಪಶುವಿನ ಹೆಸರು",
    lost_pet_type: "ಪಶುವಿನ ಪ್ರಕಾರ",
    lost_type_dog: "ನಾಯಿ",
    lost_type_cat: "ಬೆಕ್ಕು",
    lost_type_bird: "ಪಕ್ಷಿ",
    lost_type_rabbit: "ಮೊಲ",
    lost_type_other: "ಇತರೆ",
    lost_breed: "ಜಾತಿ",
    lost_color: "ಬಣ್ಣ",
    lost_location: "ಕೊನೆಯದಾಗಿ ಕಂಡ ಸ್ಥಳ",
    lost_date: "ಕಳೆದುಹೋದ/ಕಂಡುಹಿಡಿದ ದಿನಾಂಕ",
    lost_contact: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    lost_description: "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು",
    lost_placeholder_description: "ನಿಮ್ಮ ಪಶುವಿನ ವಿಶೇಷ ಲಕ್ಷಣಗಳು, ಕಾಲರ್ ವಿವರಗಳು ಇತ್ಯಾದಿ ಬರೆಯಿರಿ.",
    lost_submit_btn: "ವರದಿ ಸಲ್ಲಿಸಿ",
    lost_recent_reports: "ಇತ್ತೀಚಿನ ವರದಿಗಳು",
    title_volunteer: "ಸ್ವಯಂಸೇವಕ | PetVerse",
    volunteer_title: "ಸ್ವಯಂಸೇವಕರಾಗಿ",
    volunteer_subtitle: "ನಮ್ಮ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ ಮತ್ತು ಪ್ರಾಣಿಗಳ ಜೀವನದಲ್ಲಿ ಬದಲಾವಣೆ ತರಿರಿ 🐶🐱",
    volunteer_why_title: "ನಮ್ಮ ಜೊತೆ ಸ್ವಯಂಸೇವಕರಾಗಬೇಕೆ?",
    volunteer_why_desc: "ನಮ್ಮ ಸ್ವಯಂಸೇವಕರು PetVerse ನ ಹೃದಯ. ನೀವು ನಾಯಿಗಳನ್ನು ನಡೆದಾಡಿಸುತ್ತಿದ್ದರೂ, ಬೆಕ್ಕುಗಳ ಜೊತೆ ಸಮಯ ಕಳೆಯುತ್ತಿದ್ದರೂ, ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತಿದ್ದರೂ ಅಥವಾ ಆಡಳಿತದ ಕೆಲಸಗಳಲ್ಲಿ ಸಹಕರಿಸುತ್ತಿದ್ದರೂ — ನಿಮ್ಮ ಸಮಯ ನಿಜವಾಗಿಯೂ ವ್ಯತ್ಯಾಸ ತರುತ್ತದೆ!",
    volunteer_role_care_title: "ಪಶುಪಾಲನೆ",
    volunteer_role_care_desc: "ಆಹಾರ, ಶೃಂಗಾರ ಮತ್ತು ನಡಿಗೆ",
    volunteer_role_events_title: "ಕಾರ್ಯಕ್ರಮಗಳು",
    volunteer_role_events_desc: "ದತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಿ",
    volunteer_role_admin_title: "ನಿರ್ವಹಣಾ ಬೆಂಬಲ",
    volunteer_role_admin_desc: "ಡೇಟಾ ಎಂಟ್ರಿ, ಫೋನ್ ಮತ್ತು ಮೇಲ್",
    volunteer_form_title: "ಸ್ವಯಂಸೇವಕ ಅರ್ಜಿ",
    volunteer_firstname: "ಮೊದಲ ಹೆಸರು",
    volunteer_lastname: "ಕೊನೆಯ ಹೆಸರು",
    volunteer_email: "ಇಮೇಲ್",
    volunteer_phone: "ಫೋನ್",
    volunteer_interest: "ಆಸಕ್ತಿ ಕ್ಷೇತ್ರಗಳು",
    volunteer_interest_care: "ಪಶುಪಾಲನೆ",
    volunteer_interest_event: "ಕಾರ್ಯಕ್ರಮ ಬೆಂಬಲ",
    volunteer_interest_admin: "ನಿರ್ವಹಣಾ",
    volunteer_interest_transport: "ಸಾರಿಗೆ",
    volunteer_submit_btn: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    title_myadoptions: "ನನ್ನ ದತ್ತು ಪ್ರಾಣಿಗಳು | PetVerse",
    myadoptions_title: "ನನ್ನ ದತ್ತು ಪಡೆದ ಪಶುಗಳು",
    myadoptions_subtitle: "ನೀವು ಶಾಶ್ವತ ಮನೆ ನೀಡಿರುವ ಎಲ್ಲ ಪಶುಗಳನ್ನು ನೋಡಿ 🏡",
    myadoptions_loading: "ನಿಮ್ಮ ದತ್ತು ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    myadoptions_login_needed: "ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ",
    myadoptions_login_message: "ನಿಮ್ಮ ದತ್ತು ಪಡೆದ ಪಶುಗಳನ್ನು ನೋಡಲು ಲಾಗಿನ್ ಮಾಡಿ.",
    myadoptions_login_btn: "ಈಗ ಲಾಗಿನ್ ಮಾಡಿ",
    myadoptions_none: "ಇನ್ನೂ ಯಾವುದೇ ದತ್ತು ಇಲ್ಲ",
    myadoptions_none_message: "ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಪಶುವನ್ನು ದತ್ತು ಪಡೆದಿಲ್ಲ. ನಮ್ಮ ದತ್ತು ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಮತ್ತು ನಿಮ್ಮ ಹೊಸ ಸ್ನೇಹಿತನನ್ನು ಹುಡುಕಿ!",
    myadoptions_browse_btn: "ಪಶುಗಳನ್ನು ನೋಡಿ",
    myadoptions_age: "ವಯಸ್ಸು:",
    myadoptions_desc: "ವಿವರಣೆ:",
    myadoptions_adoptedby: "ದತ್ತು ಪಡೆದವರು:",
    myadoptions_status: "ಸ್ಥಿತಿ:",
    myadoptions_happy: "ಶಾಶ್ವತ ಮನೆಯಲ್ಲಿ ಸಂತೋಷ 🏡"
  }
};

function changeLanguage(lang, showNotice = true) {
  localStorage.setItem('preferred_language', lang);
  document.querySelectorAll('[data-i18n]:not([data-i18n-skip] *)').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang]?.[key];
    if (value === undefined) {
      console.warn(`Missing translation for key: ${key} in lang: ${lang}`);
      return;
    }
    if (['INPUT', 'TEXTAREA'].includes(el.tagName)) el.placeholder = value;
    else el.textContent = value;
  });
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const titleKey = titleEl.getAttribute('data-i18n');
    const titleValue = translations[lang]?.[titleKey];
    if (titleValue) document.title = titleValue;
  }
  if (showNotice) {
    const readable =
      lang === 'en' ? 'English' :
      lang === 'hi' ? 'Hindi' :
      lang === 'kn' ? 'Kannada' : lang.toUpperCase();
    showToast(`Language changed to ${readable}`);
  }
}

function initializeLanguage() {
  const saved = localStorage.getItem('preferred_language') || 'en';
  const select = document.getElementById('languageSelect');
  if (select) select.value = saved;
  changeLanguage(saved, false);
}

window.changeLanguage = changeLanguage;

// --- 2. GLOBAL UTILITY FUNCTIONS ---

function showToast(message, type = 'info') {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.background = type === 'error' ? '#ff6b6b' : 
                          type === 'success' ? 'var(--accent)' : 'var(--primary)';
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function injectProfileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .navbar-avatar, .navbar-avatar-default {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--primary-light);
      background-color: var(--primary-light);
      color: var(--white);
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .profile-menu-container { position: relative; }
    .profile-dropdown {
      display: none;
      position: absolute;
      top: 50px;
      right: 0;
      background: var(--white);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      min-width: 220px;
      z-index: 100;
      border: 1px solid var(--background);
      overflow: hidden;
    }
    .profile-dropdown.active { display: block; }
    .profile-dropdown-header {
      padding: 1rem;
      border-bottom: 1px solid var(--background);
    }
    .profile-dropdown-header .username {
      font-weight: 600;
      color: var(--text);
      display: block;
    }
    .profile-dropdown-header .email {
      font-size: 0.8rem;
      color: var(--text-light);
      display: block;
      word-wrap: break-word;
    }
    .profile-dropdown-item {
      display: block;
      padding: 0.8rem 1rem;
      color: var(--text);
      text-decoration: none;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .profile-dropdown-item:hover { background: var(--background); }
    .profile-dropdown-item.logout { color: #ff6b6b; }
  `;
  document.head.appendChild(style);
}

// --- 3. CORE AUTHENTICATION LOGIC ---

async function logout() {
  try {
    localStorage.removeItem('petverse_profile');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    showToast(`Goodbye! You have been logged out.`, 'success');
    updateAuthLinks();
    setTimeout(() => { window.location.href = 'index.html'; }, 1200);
  } catch (err) {
    console.error('Logout error', err);
    showToast('Logout failed', 'error');
  }
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById('profile-dropdown-menu');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

async function fetchAndCacheProfile(userId) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    if (profile) {
      localStorage.setItem('petverse_profile', JSON.stringify(profile));
      return profile;
    }
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    return null;
  }
}

async function updateAuthLinks() {
  // Check if supabase is defined. If not, wait a tiny bit.
  // This is a failsafe for script loading order.
  if (typeof supabase === 'undefined') {
    console.warn("Supabase not defined yet, retrying auth link update...");
    setTimeout(updateAuthLinks, 100);
    return;
  }
  
  const { data: { user } } = await supabase.auth.getUser();

  const navbarList = document.querySelector('.navbar ul');
  if (!navbarList) return;

  const loginLinkItem = document.getElementById("loginLink")?.parentElement;
  const logoutItem = document.getElementById("logoutItem");
  let profileMenu = document.getElementById('profile-menu-container');
  
  const chatIcon = document.getElementById("chatbotFloatingIcon");

  if (user) {
    // --- USER IS LOGGED IN ---
    
    if (chatIcon) chatIcon.style.display = "flex";

    if (loginLinkItem) loginLinkItem.style.display = 'none';
    if (logoutItem) logoutItem.style.display = 'none';
    
    let profile = JSON.parse(localStorage.getItem('petverse_profile'));
    
    if (!profile) {
      profile = await fetchAndCacheProfile(user.id);
    }
    
    const displayName = profile?.username || user.email.split('@')[0];
    const email = user.email;
    const avatarUrl = profile?.avatar_url;

    if (!profileMenu) {
      profileMenu = document.createElement('li');
      profileMenu.id = 'profile-menu-container';
      profileMenu.className = 'profile-menu-container';
      navbarList.appendChild(profileMenu);
    }
    
    let avatarButtonHtml = '';
    if (avatarUrl) {
      avatarButtonHtml = `<img src="${avatarUrl}" alt="${displayName}" class="profile-avatar-button">`;
    } else {
      const firstLetter = displayName.charAt(0).toUpperCase();
      // --- THIS IS THE FIX ---
      // The class name now matches the CSS in injectProfileStyles()
      avatarButtonHtml = `<div class="navbar-avatar-default">${firstLetter}</div>`;
    }

    profileMenu.innerHTML = `
      <div id="profile-avatar-button">
        ${avatarButtonHtml}
      </div>
      <div id="profile-dropdown-menu" class="profile-dropdown">
        <div class="profile-dropdown-header">
          <span class="username">${displayName}</span>
          <span class="email">${email}</span>
        </div>
        <a id="profile-logout-button" class="profile-dropdown-item logout">
          Logout
        </a>
      </div>
    `;

    document.getElementById('profile-avatar-button').onclick = toggleProfileDropdown;
    document.getElementById('profile-logout-button').onclick = logout;
    
    window.addEventListener('click', function(e) {
      if (profileMenu && !profileMenu.contains(e.target)) {
        document.getElementById('profile-dropdown-menu')?.classList.remove('active');
      }
    });

  } else {
    // --- USER IS LOGGED OUT ---
    
    if (chatIcon) chatIcon.style.display = "none";

    if (loginLinkItem) loginLinkItem.style.display = 'block';
    if (logoutItem) logoutItem.style.display = 'none';
    if (profileMenu) profileMenu.remove();
  }
}

// --- 4. CHATBOT LOGIC (Merged from chatbot_floating.js) ---

let chatbotLang = null;

function appendChatUser(text) {
  const chatMessages = document.getElementById("chatMessagesAI");
  if (!chatMessages) return;
  let div = document.createElement("div");
  div.className = "chatBubble userBubble";
  div.innerText = "🙂 " + text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendChatBot(text) {
  const chatMessages = document.getElementById("chatMessagesAI");
  if (!chatMessages) return;
  let div = document.createElement("div");
  div.className = "chatBubble botBubble";
  div.innerText = "🤖 " + text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
  const chatInput = document.getElementById("chatInputAI");
  const msg = chatInput.value.trim();
  if (!msg) return;

  appendChatUser(msg);
  chatInput.value = "";

  if (!chatbotLang) {
    const choice = msg.toLowerCase();
    if (["en", "hi", "mr", "kn"].includes(choice)) {
      chatbotLang = choice;
      appendChatBot("✅ Language set! Ask me anything 🐶💜");
      return;
    }
    appendChatBot("❗ Please type EN / HI / MR / KN to select language.");
    return;
  }

  try {
    appendChatBot("⏳ Thinking...");
    
    const { data, error } = await supabase.functions.invoke('chat-ai', {
      body: JSON.stringify({ message: msg, lang: chatbotLang })
    });

    const chatMessages = document.getElementById("chatMessagesAI");
    if(chatMessages.lastChild) {
      chatMessages.lastChild.remove();
    }

    if (error) {
      throw new Error(`Function error: ${error.message}`);
    }
    
    if (data && data.reply) {
      appendChatBot(data.reply);
    } else {
      appendChatBot("⚠ Sorry, I received an unexpected response from the server.");
    }
    
  } catch (err) {
    console.error("Error invoking chat-ai function:", err);
    const chatMessages = document.getElementById("chatMessagesAI");
    if (chatMessages && chatMessages.lastChild && chatMessages.lastChild.innerText.includes("⏳")) {
      chatMessages.lastChild.remove();
    }
    appendChatBot("❌ Sorry, the AI server is not responding. Please try again later.");
  }
}

function initializeChatbot() {
  const chatIcon = document.getElementById("chatbotFloatingIcon");
  const panel = document.getElementById("chatbotPanel");
  const chatInput = document.getElementById("chatInputAI");
  const sendBtn = document.getElementById("sendChatBtnAI");

  if (!chatIcon || !panel || !chatInput || !sendBtn) {
    console.warn("Chatbot HTML elements not found. Chatbot will not initialize.");
    return;
  }

  chatIcon.onclick = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showToast("Please login to use the AI Chatbot 😊", "error");
      return;
    }

    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    
    if (panel.style.display === "flex") {
      const chatMessages = document.getElementById("chatMessagesAI");
      chatMessages.innerHTML = "";
      chatbotLang = null;
      appendChatBot(
        "🐾 **PetVerse AI Assistant**\n\nChoose your language:\n🇬🇧 EN\n🇮🇳 HI\n🇮🇳 MR\n🇮🇳 KN"
      );
    }
  };

  sendBtn.onclick = sendChatMessage;
  chatInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendChatMessage();
  });
}

// --- 5. INITIALIZATION ---

try {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    if (event === "SIGNED_OUT") {
      localStorage.removeItem('petverse_profile');
    }
    updateAuthLinks(); // This will now also show/hide the chatbot icon
  });
} catch (error) {
  console.error("Error setting up onAuthStateChange:", error);
}

document.addEventListener('DOMContentLoaded', () => {
  // Make sure supabase is loaded before running this
  if (typeof supabase === 'undefined') {
    console.warn("Supabase not defined yet, retrying init...");
    setTimeout(() => document.dispatchEvent(new Event('DOMContentLoaded')), 100);
    return;
  }
  
  try {
    injectProfileStyles();
    initializeLanguage();
    updateAuthLinks();
    initializeChatbot();
  } catch (error) {
    console.error("Error during initial auth setup:", error);
  }
});