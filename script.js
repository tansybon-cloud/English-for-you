
        function toggleTheme() {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        }
        if(localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
        }

        let stars = localStorage.getItem('ef_stars') ? parseInt(localStorage.getItem('ef_stars')) : 0;
        let solved = localStorage.getItem('ef_solved') ? parseInt(localStorage.getItem('ef_solved')) : 0;

        function updateUserBadge() {
            const badge = document.getElementById('user-badge');
            const user = localStorage.getItem('ef_user');
            if (!badge) return;
            badge.textContent = user ? '👤 ' + user : '👤 អ្នកទស្សនា';
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            const msg = document.getElementById('login-message');

            if (!email || !password) {
                msg.className = 'auth-message error';
                msg.textContent = '❌ សូមបំពេញអ៊ីមែល និងពាក្យសម្ងាត់ជូនก่อน';
                return;
            }

            const displayName = email.split('@')[0].replace(/[._-]/g, ' ');
            localStorage.setItem('ef_user', displayName.charAt(0).toUpperCase() + displayName.slice(1));
            updateUserBadge();
            msg.className = 'auth-message success';
            msg.textContent = '✅ ចូលប្រព័ន្ធដោយជោគជ័យ! សូមបន្តរៀនต่อ';
            document.getElementById('login-form').reset();
        }

        function handleRegister(event) {
            event.preventDefault();
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const msg = document.getElementById('register-message');

            if (!name || !email || !password) {
                msg.className = 'auth-message error';
                msg.textContent = '❌ សូមបំពេញព័ត៌មានចាំបាច់ទាំងអស់';
                return;
            }

            if (password.length < 6) {
                msg.className = 'auth-message error';
                msg.textContent = '❌ ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ';
                return;
            }

            localStorage.setItem('ef_user', name);
            updateUserBadge();
            msg.className = 'auth-message success';
            msg.textContent = '✅ គណនីបានបង្កើតដោយជោគជ័យ!';
            document.getElementById('register-form').reset();
        }

        function updateStats() {
            const starsEl = document.getElementById('stat-stars');
            const solvedEl = document.getElementById('stat-solved');
            const lessonsEl = document.getElementById('stat-lessons');
            if (starsEl) starsEl.textContent = stars;
            if (solvedEl) solvedEl.textContent = solved;
            if (lessonsEl) lessonsEl.textContent = baseLessonsData.length + getCustomLessons().length;
        }

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        const baseLessonsData = [
            {
                unitKey: "unit1", unitNum: "Unit 1", title: "English for you - Unit 1: Greetings, Introductions & Family",
                vocab: [{en: "Hello", kh: "សួស្តី"}, {en: "Teacher", kh: "គ្រូបង្រៀន"}, {en: "Student", kh: "សិស្ស"}, {en: "Father", kh: "ឪពុក"}, {en: "Mother", kh: "ម្តាយ"}],
                dialogueEn: "Tom: Hello! My name is Tom. What's your name?\nBopha: Hi! My name is Bopha.",
                dialogueKh: "ថូម៖ សួស្តី! ខ្ញុំឈ្មោះ ថូម។ តើអ្នកឈ្មោះអ្វីដែរ?\nបុប្ផា៖ សួស្តី! ខ្ញុំឈ្មោះ បបុប្ផា។",
                grammar: "What's = What is | Possessive Adjectives: My, Your, His, Her",
                exercise: "Unscramble: 'name / What / is / your / ?' -> What is your name?"
            },
            {
                unitKey: "unit2", unitNum: "Unit 2", title: "English for you - Unit 2: Possessions, Food & Daily Routines",
                vocab: [{en: "Prahoc", kh: "ប្រហុក"}, {en: "Durian", kh: "ទុរេន"}, {en: "Wake up", kh: "ភ្ញាក់ពីគេង"}, {en: "Rainy season", kh: "រដូវវស្សា"}],
                dialogueEn: "Amber: Do you like Prahoc?\nDevi: Yes, I do! It is very delicious.",
                dialogueKh: "អាំបឺរ៖ តើអ្នកចូលចិត្តប្រហុកទេ?\nដេវី៖ បាទ/ចាស៎ ចូលចិត្ត! វាមានរសជាតិឆ្ងាញ់ណាស់។",
                grammar: "Present Simple for Routines: I wake up at 6 o'clock | Prepositions: in, on, under",
                exercise: "Fill in: My mother ______ (is / are) a teacher."
            },
            {
                unitKey: "unit3", unitNum: "Unit 3", title: "English for you - Unit 3: Village Culture, Towns & Directions",
                vocab: [{en: "Village", kh: "ភូមិ"}, {en: "Num Ansom", kh: "នំអន្សម"}, {en: "Turn left", kh: "បត់ឆ្វេង"}, {en: "Kep Seafood", kh: "អាហារសមុទ្រកែប"}],
                dialogueEn: "Sambath: Welcome to our village! Go straight and turn left.",
                dialogueKh: "សម្បត្តិ៖ សូមស្វាគមន៍មកកាន់ភូមិរបស់យើង! សូមដើរត្រង់ទៅមុខ រួចបត់ឆ្វេង។",
                grammar: "Want to + Verb | Imperatives for Directions (Turn left, Go straight)",
                exercise: "Translate: 'បត់ឆ្វេង' -> Turn left."
            },
            {
                unitKey: "unit4", unitNum: "Unit 4", title: "English for you - Unit 4: School Life, Health & Advice",
                vocab: [{en: "Headache", kh: "ឈឺក្បាល"}, {en: "Should", kh: "គួរតែ"}, {en: "Can", kh: "អាច"}, {en: "Helmet", kh: "មួកសុវត្ថិភាព"}],
                dialogueEn: "Devi: I have a headache.\nAmber: You should rest and drink water.",
                dialogueKh: "ដេវី៖ ខ្ញុំឈឺក្បាល។\nអាំបឺរ៖ អ្នកគួរតែសម្រាក និងផឹកទឹកឱ្យបានច្រើន។",
                grammar: "Modal Verbs: Should / Shouldn't for advice | Can / Can't for ability",
                exercise: "Fill in: You ______ (should / shouldn't) eat too much candy."
            },
            {
                unitKey: "unit5", unitNum: "Unit 5", title: "English for you - Unit 5: Tourism & Angkor Wat",
                vocab: [{en: "Angkor Wat", kh: "ប្រាសាទអង្គរវត្ត"}, {en: "Ancient", kh: "បុរាណ"}, {en: "Famous", kh: "ល្បីឈ្មោះ"}, {en: "Temple", kh: "ប្រាសាទ"}],
                dialogueEn: "Amber: Angkor Wat is the most famous temple in Cambodia.",
                dialogueKh: "អាំបឺរ៖ ប្រាសាទអង្គរវត្តគឺជាប្រាសាទល្បីល្បាញជាងគេបំផុតនៅកម្ពុជា។",
                grammar: "Past Simple Tense | Comparatives (-er / more) & Superlatives (-est / most)",
                exercise: "Fill in: Angkor Wat is the ______ (most / more) famous temple."
            },
            {
                unitKey: "unit6", unitNum: "Unit 6", title: "English for you - Unit 6: Advanced Grammar & Question Tags",
                vocab: [{en: "Question Tag", kh: "សំណួរបញ្ជាក់"}, {en: "Environment", kh: "បរិស្ថាន"}, {en: "Must", kh: "ត្រូវតែ"}, {en: "Chef", kh: "មេចុងភៅ"}],
                dialogueEn: "Tom: You are a chef, aren't you?\nSambath: Yes, I am!",
                dialogueKh: "ថូម៖ អ្នកគឺជាមេចុងភៅ មែនទេ?\nសម្បត្តិ៖ បាទ/ចាស៎ ពិតមែនហើយ!",
                grammar: "Question Tags (Positive sentence + Negative tag?) | Modal verbs (Must)",
                exercise: "Fill in: You are a student, ______ (aren't you / do you)?"
            },
            {
                unitKey: "unit7", unitNum: "Unit 7", title: "English for you - Unit 7: Professional Discourse & Phrasal Verbs",
                vocab: [
                    {en: "Ubiquitous", kh: "ដែលមាននៅគ្រប់ទីកន្លែង"},
                    {en: "Pragmatic", kh: "ជាក់ស្តែងនិយម"},
                    {en: "Substantiate", kh: "បញ្ជាក់ភស្តុតាង"},
                    {en: "Ambiguous", kh: "មិនច្បាស់លាស់"},
                    {en: "Meticulous", kh: "ហ្មត់ចត់បំផុត"}
                ],
                dialogueEn: "Director: We need to substantiate our claims with meticulous research.\nConsultant: Absolutely, the current market trends are quite ambiguous.",
                dialogueKh: "នាយក៖ យើងត្រូវតែគាំទ្រការទាមទាររបស់យើងដោយការស្រាវជ្រាវឱ្យបានហ្មត់ចត់។\nទីប្រឹក្សា៖ ពិតណាស់ និន្នាការទីផ្សារបច្ចុប្បន្នមានភាពមិនច្បាស់លាស់ណាស់។",
                grammar: "Advanced Inversion (Never have I..., Rarely do we...) & Discourse Markers.",
                exercise: "Rewrite using inversion: 'We rarely witness such dedication.' -> Rarely ______ such dedication."
            },
            {
                unitKey: "unit8", unitNum: "Unit 8", title: "English for you - Unit 8: Literary Analysis & Argumentation",
                vocab: [
                    {en: "Epitome", kh: "គំរូដ៏ល្អឯក"},
                    {en: "Paradigm", kh: "គំរូស្តង់ដារ"},
                    {en: "Retrospective", kh: "ការរំលឹកមើលអតីតកាល"},
                    {en: "Juxtaposition", kh: "ការដាក់ផ្ទឹមគ្នា"},
                    {en: "Conundrum", kh: "បញ្ហាស្មុគស្មាញ"}
                ],
                dialogueEn: "Professor: The juxtaposition of light and shadow creates a powerful literary paradigm.\nStudent: Indeed, it resolves a major conundrum in the author's argument.",
                dialogueKh: "សាស្រ្តាចារ្យ៖ ការដាក់ផ្ទឹមគ្នារវាងពន្លឺ និងស្រមោលបង្កើតបានជាគំរូអក្សរសាស្ត្រដ៏មានឥទ្ធិពល។\nសិស្ស៖ ពិតមែនហើយ វាបានដោះស្រាយបញ្ហាស្មុគស្មាញក្នុងការតស៊ូមតិរបស់រឿង។",
                grammar: "Advanced Subjunctive & Complex Conditional Inversions (Had it not been for...).",
                exercise: "Complete: Had they implemented the policy earlier, the crisis ______ avoided."
            },
            {
                unitKey: "unit9", unitNum: "Unit 9", title: "English for you - Unit 9: IELTS Reading Strategies & Evidence Based Answers",
                vocab: [
                    {en: "Inference", kh: "ការសន្និដ្ឋាន"},
                    {en: "Skimming", kh: "ស្កេនលឿន"},
                    {en: "Scan", kh: "ស្វែងរកយ៉ាងលឿន"},
                    {en: "Evidence", kh: "ភស្តុតាង"},
                    {en: "Context", kh: "បរិបទ"}
                ],
                dialogueEn: "Tutor: For IELTS reading, you should skim the passage first and then scan for key evidence.\nStudent: Great, I will use context clues to infer the answer.",
                dialogueKh: "គ្រូ៖ សម្រាប់ការអាន IELTS អ្នកគួរតែស្កេនអត្ថបទជាមុនសិន ទន្ទឹមនឹងការស្វែងរកភស្តុតាងសំខាន់។\nសិស្ស៖ ល្អណាស់ ខ្ញុំនឹងប្រើបរិបទដើម្បីសន្និដ្ឋានចម្លើយ។",
                grammar: "Text structure analysis | Skimming vs scanning | Purpose and tone recognition",
                exercise: "Explain how skimming differs from scanning when answering IELTS reading questions."
            },
            {
                unitKey: "unit10", unitNum: "Unit 10", title: "English for you - Unit 10: Academic Writing & Essay Organisation",
                vocab: [
                    {en: "Thesis", kh: "ទ្រឹស្ដីបទ"},
                    {en: "Coherence", kh: "ភាពស្របគ្នា"},
                    {en: "Introduction", kh: "ផ្នែកណែនាំ"},
                    {en: "Paragraph", kh: "កថាខណ្ឌ"},
                    {en: "Conclusion", kh: "សេចក្តីសន្និដ្ឋាន"}
                ],
                dialogueEn: "Mentor: Start your essay with a clear thesis and build each paragraph around a single idea.\nStudent: I will make sure the conclusion restates the main argument clearly.",
                dialogueKh: "អ្នកណែនាំ៖ ចាប់ផ្តើមអត្ថបទដោយប្រយោគបង្ហាញគំនិតស្នូលច្បាស់លាស់ ហើយបង្កើតកថាខណ្ឌនីមួយៗជុំវិញគំនិតមួយ។\nសិស្ស៖ ខ្ញុំនឹងធានាថាសេចក្តីសន្និដ្ឋានរំលឹកអំណះអំណាងសំខាន់ៗឱ្យបានច្បាស់។",
                grammar: "Essay structure: introduction, body, conclusion | Linking words and cohesion",
                exercise: "Write one sentence that introduces the thesis of an academic essay."
            },
            {
                unitKey: "unit11", unitNum: "Unit 11", title: "English for you - Unit 11: Public Speaking & Presentation Delivery",
                vocab: [
                    {en: "Delivery", kh: "ការដឹកនាំ/បង្ហាញ"},
                    {en: "Audience", kh: "សាធារណជន"},
                    {en: "Tone", kh: "សម្លេង/សំឡេង"},
                    {en: "Pause", kh: "ឈប់មួយភ្លែត"},
                    {en: "Emphasis", kh: "ការសង្កត់ធ្ងន់"}
                ],
                dialogueEn: "Coach: Speak to your audience with confident tone and deliberate pauses.\nStudent: I will emphasize my main point and maintain eye contact.",
                dialogueKh: "អ្នកបណ្តុះបណ្តាល៖ និយាយទៅកាន់អ្នកស្តាប់ដោយសម្លេងមានទំនុកចិត្ត និងផ្អាកនៅកន្លែងសមរម្យ។\nសិស្ស៖ ខ្ញុំនឹងសង្កត់ធ្ងន់លើចំណុចសំខាន់ និងរក្សាការសម្លឹងភ្នែកជាមួយអ្នកស្តាប់។",
                grammar: "Stress and intonation | Signposting language for public speaking",
                exercise: "Create a short introduction sentence for a class presentation."
            },
            {
                unitKey: "unit12", unitNum: "Unit 12", title: "English for you - Unit 12: Mastery Project & Final Review",
                vocab: [
                    {en: "Portfolio", kh: "កម្រាសសិក្សា"},
                    {en: "Reflection", kh: "ការឆ្លុះបញ្ចាំង"},
                    {en: "Milestone", kh: "សញ្សា/ដំណាក់កាលសំខាន់"},
                    {en: "Revision", kh: "ការត្រួតពិនិត្យឡើងវិញ"},
                    {en: "Feedback", kh: "មតិយោបល់"}
                ],
                dialogueEn: "Teacher: Your final portfolio should show reflection, revision, and clear improvement.\nStudent: I will include feedback and highlight each milestone I completed.",
                dialogueKh: "គ្រូ៖ កម្រាសចុងក្រោយរបស់អ្នកគួរបង្ហាញពីការឆ្លុះបញ្ចាំង ការត្រួតពិនិត្យឡើងវិញ និងការកែលម្អច្បាស់លាស់។\nសិស្ស៖ ខ្ញុំនឹងបញ្ចូលមតិយោបល់ និងលើកឡើងនូវដំណាក់កាលសំខាន់ដែលខ្ញុំបានបំពេញ។",
                grammar: "Reflective writing | Summarising progress and improvement over time",
                exercise: "Write a short reflection on your strongest improvement in English this term."
            }
        ];

        const lessonTeachingGuides = {
            unit1: {
                vocabulary: [
                    {en: "Good morning", pronunciation: "ɡʊd ˈmɔːrnɪŋ", kh: "អរុណសួស្តី", example: "Good morning, teacher."},
                    {en: "Nice to meet you", pronunciation: "naɪs tə miːt juː", kh: "រីករាយដែលបានជួបអ្នក", example: "Nice to meet you, Dara."},
                    {en: "Classmate", pronunciation: "ˈklæsmeɪt", kh: "មិត្តរួមថ្នាក់", example: "Sophea is my classmate."},
                    {en: "Parents", pronunciation: "ˈperənts", kh: "ឪពុកម្តាយ", example: "My parents live in Siem Reap."},
                    {en: "Older brother", pronunciation: "ˈoʊldər ˈbrʌðər", kh: "បងប្រុស", example: "My older brother is a student."},
                    {en: "Younger sister", pronunciation: "ˈjʌŋɡər ˈsɪstər", kh: "ប្អូនស្រី", example: "Her younger sister is kind."}
                ],
                objective: "សិស្សអាចសួរ និងប្រាប់ឈ្មោះ សួរសុខទុក្ខ និងណែនាំសមាជិកគ្រួសារដោយប្រើប្រយោគខ្លីៗ។",
                grammarExplain: "ប្រើ My/Your/His/Her នៅពីមុខនាមដើម្បីបង្ហាញភាពជាម្ចាស់។ My name = ឈ្មោះរបស់ខ្ញុំ; Her father = ឪពុករបស់នាង។ ប្រើ What's ជាទម្រង់កាត់របស់ What is ក្នុងការសួរ។",
                model: "What's your name? — My name is Lina. This is my older brother.",
                modelKh: "តើអ្នកឈ្មោះអ្វី? — ខ្ញុំឈ្មោះ លីណា។ នេះគឺជាបងប្រុសរបស់ខ្ញុំ។",
                paragraph: {
                    title: "Introduce Myself (ណែនាំខ្លួន)",
                    english: "Hello! My name is Lina. I am 15 years old, and I live in Siem Reap. I am a student. My favorite subject is English because I enjoy learning new words. There are five people in my family. In my free time, I like reading and listening to music. Nice to meet you!",
                    khmer: "សួស្តី! ខ្ញុំឈ្មោះ លីណា។ ខ្ញុំមានអាយុ ១៥ ឆ្នាំ ហើយខ្ញុំរស់នៅខេត្តសៀមរាប។ ខ្ញុំជាសិស្ស។ មុខវិជ្ជាដែលខ្ញុំចូលចិត្តជាងគេគឺភាសាអង់គ្លេស ព្រោះខ្ញុំចូលចិត្តរៀនពាក្យថ្មីៗ។ គ្រួសារខ្ញុំមានសមាជិក ៥ នាក់។ ពេលទំនេរ ខ្ញុំចូលចិត្តអានសៀវភៅ និងស្តាប់តន្ត្រី។ រីករាយដែលបានស្គាល់អ្នក!"
                },
                steps: ["ស្តាប់ និងនិយាយតាមពាក្យសួរសុខទុក្ខ ២ ដង។", "ប្តូរឈ្មោះក្នុងគំរូសន្ទនា ហើយសម្តែងជាគូ។", "ណែនាំមនុស្សម្នាក់ក្នុងគ្រួសារដោយប្រើ My/His/Her។"],
                practice: "បំពេញ៖ This is ___ mother. (I) / សរសេរសន្ទនាណែនាំខ្លួន ២ ប្រយោគ។",
                answer: "This is my mother. ប្រើ my ព្រោះអ្នកនិយាយកំពុងនិយាយអំពីម្តាយរបស់ខ្លួន។",
                homework: "សរសេរ paragraph ណែនាំខ្លួន ៦–៨ ប្រយោគ ដោយប្តូរឈ្មោះ អាយុ ទីកន្លែង មុខវិជ្ជា និងព័ត៌មានគ្រួសារឱ្យត្រូវនឹងខ្លួនអ្នក។"
            },
            unit2: {
                vocabulary: [
                    {en: "Breakfast", pronunciation: "ˈbrekfəst", kh: "អាហារពេលព្រឹក", example: "I eat breakfast at seven."},
                    {en: "Delicious", pronunciation: "dɪˈlɪʃəs", kh: "ឆ្ងាញ់", example: "The soup is delicious."},
                    {en: "Usually", pronunciation: "ˈjuːʒuəli", kh: "ជាធម្មតា", example: "We usually walk to school."},
                    {en: "Get dressed", pronunciation: "ɡet drest", kh: "ស្លៀកពាក់", example: "He gets dressed after breakfast."},
                    {en: "At night", pronunciation: "æt naɪt", kh: "នៅពេលយប់", example: "I read at night."},
                    {en: "Favorite", pronunciation: "ˈfeɪvərɪt", kh: "ដែលចូលចិត្តជាងគេ", example: "Amok is my favorite food."}
                ],
                objective: "សិស្សអាចនិយាយពីអាហារដែលចូលចិត្ត និងរៀបរាប់ទម្លាប់ប្រចាំថ្ងៃតាមលំដាប់ពេលវេលា។",
                grammarExplain: "Present Simple ប្រើសម្រាប់ទម្លាប់ និងការពិត។ ជាមួយ I/you/we/they ប្រើកិរិយាសព្ទដើម (I eat)។ ជាមួយ he/she/it បន្ថែម -s/-es (She eats; He watches)។ សំណួរប្រើ Do/Does។",
                model: "I usually eat breakfast at 7. My sister likes fruit, but she doesn't like spicy food.",
                modelKh: "ខ្ញុំជាធម្មតាញ៉ាំអាហារពេលព្រឹកម៉ោង ៧។ ប្អូនស្រីខ្ញុំចូលចិត្តផ្លែឈើ ប៉ុន្តែនាងមិនចូលចិត្តអាហារហឹរទេ។",
                paragraph: {
                    title: "My Daily Routine (ការរស់នៅប្រចាំថ្ងៃ)",
                    english: "I wake up at 6 o'clock every morning. First, I wash my face and get dressed. Then I have breakfast with my family. I go to school at 7 o'clock and study until the afternoon. After school, I do my homework and help my parents. In the evening, I have dinner, read a book, and prepare for the next day. I usually go to bed at 9:30.",
                    khmer: "ខ្ញុំភ្ញាក់ពីគេងម៉ោង ៦ រៀងរាល់ព្រឹក។ ដំបូង ខ្ញុំលាងមុខ និងស្លៀកពាក់។ បន្ទាប់មក ខ្ញុំញ៉ាំអាហារពេលព្រឹកជាមួយគ្រួសារ។ ខ្ញុំទៅសាលាម៉ោង ៧ ហើយរៀនរហូតដល់ពេលរសៀល។ ក្រោយចេញពីសាលា ខ្ញុំធ្វើកិច្ចការផ្ទះ និងជួយឪពុកម្តាយ។ ពេលល្ងាច ខ្ញុំញ៉ាំអាហារពេលល្ងាច អានសៀវភៅ និងត្រៀមខ្លួនសម្រាប់ថ្ងៃបន្ទាប់។ ជាធម្មតា ខ្ញុំចូលគេងម៉ោង ៩:៣០។"
                },
                steps: ["រៀបពាក្យអំពីពេលព្រឹក ថ្ងៃ និងយប់ជាបីក្រុម។", "បង្កើតប្រយោគទម្លាប់មួយដោយ I និងមួយដោយ He/She។", "សួរមិត្ត៖ What food do you like? ហើយកត់ចម្លើយ។"],
                practice: "កែប្រយោគ៖ She eat breakfast at 6. / បំពេញ៖ ___ you like durian?",
                answer: "She eats breakfast at 6. — បន្ថែម -s ព្រោះប្រធានជា She។ Do you like durian? — ប្រើ Do ជាមួយ you។",
                homework: "សរសេរ paragraph អំពីទម្លាប់ប្រចាំថ្ងៃ ៦–៨ ប្រយោគ ដោយប្រើ Present Simple និងពាក្យភ្ជាប់ First, Then, After school និង In the evening។"
            },
            unit3: {
                vocabulary: [
                    {en: "Market", pronunciation: "ˈmɑːrkɪt", kh: "ផ្សារ", example: "The market is near the school."},
                    {en: "Go straight", pronunciation: "ɡoʊ streɪt", kh: "ទៅត្រង់", example: "Go straight for two blocks."},
                    {en: "Turn right", pronunciation: "tɜːrn raɪt", kh: "បត់ស្តាំ", example: "Turn right at the bridge."},
                    {en: "Across from", pronunciation: "əˈkrɔːs frəm", kh: "ទល់មុខ", example: "The clinic is across from the bank."},
                    {en: "Next to", pronunciation: "nekst tuː", kh: "នៅជាប់នឹង", example: "The shop is next to the pagoda."},
                    {en: "Neighborhood", pronunciation: "ˈneɪbərhʊd", kh: "សង្កាត់/តំបន់ជិតផ្ទះ", example: "My neighborhood is quiet."}
                ],
                objective: "សិស្សអាចសួរផ្លូវ និងផ្តល់ទិសដៅសាមញ្ញ ព្រមទាំងប្រាប់ទីតាំងកន្លែងក្នុងសហគមន៍។",
                grammarExplain: "ប្រើកិរិយាសព្ទបញ្ជាដោយដាក់កិរិយាសព្ទដើមនៅដើមប្រយោគ៖ Go straight; Turn left។ ប្រើ Where is...? ដើម្បីសួរទីតាំង និង next to/across from ដើម្បីពណ៌នាទីតាំង។",
                model: "Excuse me, where is the market? Go straight and turn left. It is next to the school.",
                modelKh: "សូមទោស តើផ្សារនៅឯណា? ទៅត្រង់ ហើយបត់ឆ្វេង។ វានៅជាប់សាលារៀន។",
                steps: ["គូរផែនទីតូចមួយដែលមានផ្ទះ សាលា និងផ្សារ។", "ហាត់សួរ Where is the...? ជាមួយមិត្ត។", "ឆ្លើយដោយប្រើ Go straight/Turn និង next to/across from។"],
                practice: "បកប្រែ៖ បត់ស្តាំនៅស្ពាន។ / បំពេញ៖ The bank is ___ from the market. (ទល់មុខ)",
                answer: "Turn right at the bridge. / across — across from មានន័យថានៅទល់មុខ។",
                homework: "សរសេរទិសដៅពីផ្ទះទៅសាលា ៤ ជំហានជាភាសាអង់គ្លេស។"
            },
            unit4: {
                vocabulary: [
                    {en: "Sore throat", pronunciation: "sɔːr θroʊt", kh: "ឈឺបំពង់ក", example: "I have a sore throat."},
                    {en: "Cough", pronunciation: "kɔːf", kh: "ក្អក", example: "She has a bad cough."},
                    {en: "Rest", pronunciation: "rest", kh: "សម្រាក", example: "You should get some rest."},
                    {en: "Take medicine", pronunciation: "teɪk ˈmedɪsɪn", kh: "លេបថ្នាំ", example: "Take medicine after food."},
                    {en: "Careful", pronunciation: "ˈkerfəl", kh: "ប្រុងប្រយ័ត្ន", example: "Be careful when you cross."},
                    {en: "Healthy", pronunciation: "ˈhelθi", kh: "មានសុខភាពល្អ", example: "Fruit is part of a healthy diet."}
                ],
                objective: "សិស្សអាចប្រាប់រោគសញ្ញាសាមញ្ញ សុំជំនួយ និងផ្តល់ដំបូន្មានដោយគោរព។",
                grammarExplain: "Should + កិរិយាសព្ទដើម ប្រើសម្រាប់ដំបូន្មាន៖ You should rest។ Shouldn't + កិរិយាសព្ទដើម ប្រើសម្រាប់អ្វីដែលមិនគួរធ្វើ។ Can/can't បង្ហាញសមត្ថភាព ឬការអនុញ្ញាត។",
                model: "I have a cough. You should drink warm water, and you shouldn't stay up late.",
                modelKh: "ខ្ញុំក្អក។ អ្នកគួរផឹកទឹកក្តៅ ហើយអ្នកមិនគួរគេងយប់ពេកទេ។",
                steps: ["ផ្គូផ្គងរោគសញ្ញា (cough, headache) ជាមួយរូបភាព ឬកាយវិការ។", "ហាត់សន្ទនាអ្នកជំងឺ និងអ្នកផ្តល់ដំបូន្មាន។", "ពិនិត្យថាក្រោយ should/shouldn't ជាកិរិយាសព្ទដើម មិនបន្ថែម -s។"],
                practice: "បំពេញ៖ You ___ (should/shouldn't) wear a helmet on a motorbike. / បង្កើតដំបូន្មានមួយសម្រាប់ឈឺក្បាល។",
                answer: "should — គួរពាក់មួកសុវត្ថិភាព។ ឧទាហរណ៍៖ You should rest. ក្រោយ should ប្រើ rest ជាកិរិយាសព្ទដើម។",
                homework: "សរសេរដំបូន្មាន ៣ ប្រយោគសម្រាប់អ្នកចង់មានសុខភាពល្អ។"
            },
            unit5: {
                vocabulary: [
                    {en: "Ancient", pronunciation: "ˈeɪnʃənt", kh: "បុរាណ", example: "Angkor Wat is an ancient temple."},
                    {en: "Visitor", pronunciation: "ˈvɪzɪtər", kh: "អ្នកទស្សនា", example: "Many visitors come every year."},
                    {en: "Explore", pronunciation: "ɪkˈsplɔːr", kh: "រុករក/ស្វែងយល់", example: "We explored the old city."},
                    {en: "Famous for", pronunciation: "ˈfeɪməs fɔːr", kh: "ល្បីដោយសារ", example: "Cambodia is famous for Angkor Wat."},
                    {en: "Built", pronunciation: "bɪlt", kh: "បានសាងសង់", example: "The temple was built long ago."},
                    {en: "Yesterday", pronunciation: "ˈjestərdeɪ", kh: "ម្សិលមិញ", example: "We visited the museum yesterday."}
                ],
                objective: "សិស្សអាចពណ៌នាកន្លែងទេសចរណ៍ ប្រៀបធៀបទីកន្លែង និងរៀបរាប់ដំណើរកម្សាន្តកន្លងមក។",
                grammarExplain: "Past Simple ប្រើសម្រាប់សកម្មភាពដែលបានបញ្ចប់ក្នុងអតីតកាល។ កិរិយាសព្ទទៀងទាត់បន្ថែម -ed (visit → visited); កិរិយាសព្ទមិនទៀងទាត់ត្រូវចងចាំ (go → went)។ ប្រៀបធៀបខ្លីប្រើ -er និងកម្រិតខ្ពស់ប្រើ the most។",
                model: "We visited Angkor Wat yesterday. It was more beautiful than I expected.",
                modelKh: "ពួកយើងបានទៅទស្សនាអង្គរវត្តម្សិលមិញ។ វាស្រស់ស្អាតជាងអ្វីដែលខ្ញុំបានរំពឹងទុក។",
                steps: ["កំណត់ពាក្យពេលវេលាអតីតកាល៖ yesterday/last year។", "បម្លែងកិរិយាសព្ទក្នុងប្រយោគទៅអតីតកាល។", "ពណ៌នាទីកន្លែងមួយដោយប្រើ famous for និងពាក្យប្រៀបធៀប។"],
                practice: "បំពេញ៖ We ___ (go) to the temple last week. / ប្រៀបធៀប៖ Angkor Wat is ___ (famous) temple in Cambodia.",
                answer: "went — go ជាកិរិយាសព្ទមិនទៀងទាត់។ / the most famous — ប្រើ the most ជាមួយ adjective វែង។",
                homework: "សរសេរកំណត់ហេតុដំណើរកម្សាន្ត ៥ ប្រយោគ ដោយប្រើ Past Simple។"
            },
            unit6: {
                vocabulary: [
                    {en: "Must", pronunciation: "mʌst", kh: "ត្រូវតែ", example: "You must wear a seat belt."},
                    {en: "Have to", pronunciation: "hæv tuː", kh: "ចាំបាច់ត្រូវ", example: "I have to finish my homework."},
                    {en: "Mustn't", pronunciation: "ˈmʌsənt", kh: "ហាមដាច់ខាត", example: "You mustn't touch that wire."},
                    {en: "Recycle", pronunciation: "ˌriːˈsaɪkəl", kh: "កែច្នៃប្រើឡើងវិញ", example: "We should recycle paper."},
                    {en: "Invitation", pronunciation: "ˌɪnvɪˈteɪʃən", kh: "ការអញ្ជើញ", example: "Thanks for the invitation."},
                    {en: "Probably", pronunciation: "ˈprɑːbəbli", kh: "ប្រហែលជា", example: "It will probably rain later."}
                ],
                objective: "សិស្សអាចប្រើ modal verbs និង question tags ដើម្បីបង្ហាញកាតព្វកិច្ច សំណើ និងសុំការបញ្ជាក់។",
                grammarExplain: "Modal verb ដូចជា must/can/should តាមដោយកិរិយាសព្ទដើម (must go)។ Question tag ផ្ទុយនឹងប្រយោគ៖ You are ready, aren't you? បើប្រយោគវិជ្ជមាន tag ជាអវិជ្ជមាន; បើអវិជ្ជមាន tag ជាវិជ្ជមាន។",
                model: "We must protect the environment, shouldn't we? No, we should.",
                modelKh: "យើងត្រូវការពារបរិស្ថាន មែនទេ? បាទ/ចាស៎ យើងគួរតែការពារ។",
                steps: ["គូសបន្ទាត់ក្រោម modal verb និងកិរិយាសព្ទដែលតាមក្រោយ។", "កំណត់ថាប្រយោគមេវិជ្ជមាន ឬអវិជ្ជមាន។", "បង្កើត question tag ដោយប្រើ auxiliary និង pronoun ត្រឹមត្រូវ។"],
                practice: "បំពេញ៖ She can swim, ___? / You ___ (mustn't/don't have to) smoke here. (ហាម)",
                answer: "can't she? — can វិជ្ជមាន ដូច្នេះ tag អវិជ្ជមាន។ / mustn't — មានន័យថាហាម មិនមែនគ្រាន់តែមិនចាំបាច់ទេ។",
                homework: "សរសេរច្បាប់ថ្នាក់រៀន ៣ ប្រយោគដោយប្រើ must/mustn't និងបន្ថែម question tag មួយ។"
            },
            unit7: {
                vocabulary: [
                    {en: "Substantiate", pronunciation: "səbˈstænʃieɪt", kh: "បញ្ជាក់ដោយភស្តុតាង", example: "Data substantiate the claim."},
                    {en: "Meticulous", pronunciation: "məˈtɪkjələs", kh: "ហ្មត់ចត់", example: "She keeps meticulous records."},
                    {en: "Reliable", pronunciation: "rɪˈlaɪəbəl", kh: "អាចទុកចិត្តបាន", example: "Use reliable sources."},
                    {en: "Furthermore", pronunciation: "ˌfɜːrðərˈmɔːr", kh: "លើសពីនេះទៅទៀត", example: "Furthermore, the cost is lower."},
                    {en: "Carry out", pronunciation: "ˈkæri aʊt", kh: "អនុវត្ត/ធ្វើ", example: "The team carried out a survey."},
                    {en: "Point out", pronunciation: "pɔɪnt aʊt", kh: "ចង្អុលបង្ហាញ", example: "The report points out a risk."}
                ],
                objective: "សិស្សអាចប្រើវាក្យសព្ទផ្លូវការ និងភ្ជាប់គំនិតក្នុងការពិភាក្សា ឬសរសេរកថាខណ្ឌការងារ។",
                grammarExplain: "Inversion កើតឡើងពេលដាក់ពាក្យអវិជ្ជមាន/កំណត់ដូចជា Never ឬ Rarely នៅដើមប្រយោគ៖ Never have I seen... រចនាសម្ព័ន្ធគឺ Negative adverb + auxiliary + subject + main verb។ ប្រយោគ Present Simple ប្រើ do/does។",
                model: "Rarely do we see such careful research. Furthermore, the results substantiate the proposal.",
                modelKh: "កម្រណាស់ដែលយើងឃើញការស្រាវជ្រាវហ្មត់ចត់បែបនេះ។ លើសពីនេះ លទ្ធផលបានបញ្ជាក់គាំទ្រសំណើ។",
                steps: ["សម្គាល់ពាក្យភ្ជាប់គំនិត៖ furthermore, however, therefore។", "ប្តូរ Rarely do we... ត្រឡប់ទៅ We rarely... ដើម្បីឃើញលំដាប់ដើម។", "ប្រើឃ្លា phrasal verb មួយក្នុងប្រយោគការងារ។"],
                practice: "ប្តូរទម្រង់៖ We have never received such feedback. → Never ___.",
                answer: "Never have we received such feedback. ដាក់ Never ដើមប្រយោគ ហើយប្តូរ have មកមុខប្រធាន we។",
                homework: "សរសេរកថាខណ្ឌខ្លី ៤ ប្រយោគអំពីការងារជាក្រុម ដោយប្រើ furthermore និង phrasal verb មួយ។"
            },
            unit8: {
                vocabulary: [
                    {en: "Epitome", pronunciation: "ɪˈpɪtəmi", kh: "គំរូដ៏ល្អឯក", example: "She is the epitome of patience."},
                    {en: "Juxtaposition", pronunciation: "ˌdʒʌkstəpəˈzɪʃən", kh: "ការដាក់អ្វីពីរផ្ទុយគ្នាក្បែរៗ", example: "The story uses a juxtaposition of hope and fear."},
                    {en: "Perspective", pronunciation: "pərˈspektɪv", kh: "ទស្សនៈ", example: "The story is told from a child's perspective."},
                    {en: "Symbolize", pronunciation: "ˈsɪmbəlaɪz", kh: "តំណាងឱ្យ", example: "The dove symbolizes peace."},
                    {en: "Whereas", pronunciation: "werˈæz", kh: "ចំណែកឯ/ខណៈដែល", example: "The hero is brave, whereas his friend is cautious."},
                    {en: "Interpret", pronunciation: "ɪnˈtɜːrprɪt", kh: "បកស្រាយ", example: "Readers may interpret the ending differently."}
                ],
                objective: "សិស្សអាចបកស្រាយអត្ថន័យក្នុងអត្ថបទ និងគាំទ្រមតិដោយយកភស្តុតាងពីអត្ថបទមកបង្ហាញ។",
                grammarExplain: "ក្នុងការតស៊ូមតិ បែងចែក claim (មតិ/ការអះអាង), evidence (ភស្តុតាង) និង reasoning (ការពន្យល់ភ្ជាប់)។ ប្រើ whereas ដើម្បីប្រៀបធៀបគំនិតផ្ទុយគ្នា។ Inversion ក្នុង conditional អាចកាត់ if៖ Had they known = If they had known។",
                model: "The dark setting symbolizes fear, whereas the sunrise suggests hope.",
                modelKh: "បរិយាកាសងងឹតតំណាងឱ្យការភ័យខ្លាច ចំណែកឯព្រះអាទិត្យរះបង្ហាញពីក្តីសង្ឃឹម។",
                steps: ["រកពាក្យ ឬរូបភាពដែលកើតឡើងម្ដងហើយម្ដងទៀតក្នុងអត្ថបទ។", "បង្កើត claim មួយ ហើយដកស្រង់ evidence គាំទ្រ។", "ពន្យល់ថាភស្តុតាងបង្ហាញអត្ថន័យអ្វី ដោយមិនសង្ខេបតែសាច់រឿង។"],
                practice: "បំពេញ៖ Had I ___ (know) the truth, I would have acted differently. / ភ្ជាប់ប្រយោគពីរដោយ whereas។",
                answer: "known — Had + subject + past participle គឺទម្រង់កាត់ពី If I had known។ Whereas ប្រើបង្ហាញភាពផ្ទុយគ្នារវាងគំនិត។",
                homework: "ជ្រើសរើសរឿងខ្លីមួយ ហើយសរសេរ claim, evidence និង explanation មួយចំណុច។"
            },
            unit9: {
                vocabulary: [
                    {en: "Skim", pronunciation: "skɪm", kh: "អានរហ័សដើម្បីចាប់គំនិតសរុប", example: "Skim the headings before reading."},
                    {en: "Scan", pronunciation: "skæn", kh: "ស្វែងរកព័ត៌មានជាក់លាក់", example: "Scan for the date and place."},
                    {en: "Inference", pronunciation: "ˈɪnfərəns", kh: "ការសន្និដ្ឋានពីតម្រុយ", example: "We can infer that he is tired."},
                    {en: "Keyword", pronunciation: "ˈkiːwɜːrd", kh: "ពាក្យគន្លឹះ", example: "Underline keywords in the question."},
                    {en: "Not given", pronunciation: "nɑːt ˈɡɪvən", kh: "មិនមានព័ត៌មានបញ្ជាក់", example: "Choose Not Given if the text is silent."},
                    {en: "Paraphrase", pronunciation: "ˈpærəfreɪz", kh: "និយាយ/សរសេរឡើងវិញដោយពាក្យផ្សេង", example: "The answer paraphrases the passage."}
                ],
                objective: "សិស្សអាចជ្រើសរើសយុទ្ធសាស្ត្រអានឱ្យត្រូវនឹងសំណួរ និងបញ្ជាក់ចម្លើយដោយភស្តុតាងក្នុងអត្ថបទ។",
                grammarExplain: "Skimming គឺអានចំណងជើង ប្រយោគដើម និងពាក្យសំខាន់ដើម្បីចាប់គំនិតទូទៅ។ Scanning គឺស្វែងរកព័ត៌មានជាក់លាក់ ដូចជា ឈ្មោះ ថ្ងៃខែ ឬលេខ។ កុំឆ្លើយតាមចំណេះដឹងខាងក្រៅ ប្រសិនបើអត្ថបទមិនបានប្រាប់។",
                model: "Question: When did the museum open? Scan the passage for a year, then check the sentence around it.",
                modelKh: "សំណួរ៖ សារមន្ទីរបើកនៅពេលណា? ស្វែងរកឆ្នាំក្នុងអត្ថបទ រួចអានប្រយោគជុំវិញវា។",
                steps: ["អានសំណួរមុន និងគូសពាក្យគន្លឹះ។", "Skim អត្ថបទដើម្បីដឹងថាកថាខណ្ឌណាពាក់ព័ន្ធ។", "Scan រកពាក្យ ឬ paraphrase ហើយអានបរិបទដើម្បីផ្ទៀងផ្ទាត់។"],
                practice: "ក្នុងសំណួរដែលសួរឆ្នាំ តើគួរប្រើ skimming ឬ scanning? ហេតុអ្វី?",
                answer: "Scanning ព្រោះត្រូវរកព័ត៌មានជាក់លាក់មួយ គឺឆ្នាំ មិនមែនចាប់គំនិតទូទៅទាំងអត្ថបទទេ។",
                homework: "យកអត្ថបទអង់គ្លេសខ្លីមួយ កត់ main idea និងស្វែងរកព័ត៌មានជាក់លាក់ ៣ ចំណុច។"
            },
            unit10: {
                vocabulary: [
                    {en: "Thesis statement", pronunciation: "ˈθiːsɪs ˈsteɪtmənt", kh: "ប្រយោគបង្ហាញគំនិតស្នូល", example: "The thesis states the writer's position."},
                    {en: "Topic sentence", pronunciation: "ˈtɑːpɪk ˈsentəns", kh: "ប្រយោគប្រធានកថាខណ្ឌ", example: "Each paragraph needs a topic sentence."},
                    {en: "Supporting detail", pronunciation: "səˈpɔːrtɪŋ ˈdiːteɪl", kh: "ព័ត៌មានគាំទ្រ", example: "Add a fact as a supporting detail."},
                    {en: "Transition", pronunciation: "trænˈzɪʃən", kh: "ពាក្យ/ឃ្លាភ្ជាប់គំនិត", example: "However is a transition word."},
                    {en: "Evidence", pronunciation: "ˈevɪdəns", kh: "ភស្តុតាង", example: "Use evidence to support your claim."},
                    {en: "Revise", pronunciation: "rɪˈvaɪz", kh: "កែសម្រួលខ្លឹមសារ", example: "Revise the draft for clear ideas."}
                ],
                objective: "សិស្សអាចរៀបចំ essay មាន introduction, body paragraphs និង conclusion ព្រមទាំងគាំទ្រគំនិតដោយឧទាហរណ៍។",
                grammarExplain: "Essay មាន ៣ ផ្នែក៖ Introduction ណែនាំប្រធានបទ និង thesis; Body paragraph នីមួយៗមាន topic sentence, supporting details និង explanation; Conclusion សង្ខេបគំនិតសំខាន់ដោយមិនបញ្ចូលប្រធានបទថ្មី។ ប្រើ linking words ដើម្បីឱ្យអត្ថបទរលូន។",
                model: "Students should read every day because reading builds vocabulary and improves concentration.",
                modelKh: "សិស្សគួរអានរៀងរាល់ថ្ងៃ ព្រោះការអានជួយបង្កើនវាក្យសព្ទ និងការផ្តោតអារម្មណ៍។",
                steps: ["សរសេរមតិចម្បងមួយឃ្លា ដើម្បីបង្កើត thesis statement។", "រៀបចំមូលហេតុមួយក្នុង body paragraph នីមួយៗ។", "បន្ថែមឧទាហរណ៍ និងពន្យល់ថាឧទាហរណ៍នោះគាំទ្រមតិយ៉ាងដូចម្តេច។"],
                practice: "កំណត់ thesis ក្នុងប្រយោគគំរូខាងលើ ហើយផ្តល់ supporting detail មួយ។",
                answer: "Thesis៖ Students should read every day. Supporting detail អាចជា៖ For example, reading a short story introduces new words in context.",
                homework: "សរសេរ outline សម្រាប់ essay ៣ កថាខណ្ឌអំពីអត្ថប្រយោជន៍នៃការរៀនភាសាអង់គ្លេស។"
            },
            unit11: {
                vocabulary: [
                    {en: "Audience", pronunciation: "ˈɔːdiəns", kh: "អ្នកស្តាប់/ទស្សនិកជន", example: "Know your audience before you speak."},
                    {en: "Opening", pronunciation: "ˈoʊpənɪŋ", kh: "ការបើកសុន្ទរកថា", example: "Begin with a clear opening."},
                    {en: "Signpost", pronunciation: "ˈsaɪnpoʊst", kh: "ឃ្លាបង្ហាញលំដាប់គំនិត", example: "First, I will explain the problem."},
                    {en: "Eye contact", pronunciation: "aɪ ˈkɑːntækt", kh: "ការសម្លឹងភ្នែកអ្នកស្តាប់", example: "Make eye contact with the audience."},
                    {en: "Emphasize", pronunciation: "ˈemfəsaɪz", kh: "សង្កត់ធ្ងន់", example: "Emphasize the key finding."},
                    {en: "Q&A session", pronunciation: "ˌkjuː ən ˈeɪ ˈseʃən", kh: "វគ្គសំណួរ និងចម្លើយ", example: "We will have a Q&A session at the end."}
                ],
                objective: "សិស្សអាចរៀបចំ និងថ្លែងបទបង្ហាញខ្លីដោយមានការបើកច្បាស់ លំដាប់គំនិត និងការបញ្ចប់សមរម្យ។",
                grammarExplain: "ប្រើ signposting phrases ដើម្បីនាំអ្នកស្តាប់៖ First, Next, Finally។ ប្រើ I’m going to talk about... ដើម្បីណែនាំប្រធានបទ និង To sum up... ដើម្បីសង្ខេប។ ផ្អាកបន្តិចក្រោយគំនិតសំខាន់ ដើម្បីឱ្យអ្នកស្តាប់តាមទាន់។",
                model: "Good morning. Today, I’m going to talk about clean water. First, I’ll explain why it matters. Finally, I’ll share three ways to save water.",
                modelKh: "អរុណសួស្តី។ ថ្ងៃនេះ ខ្ញុំនឹងនិយាយអំពីទឹកស្អាត។ ជាដំបូង ខ្ញុំនឹងពន្យល់ថាហេតុអ្វីវាសំខាន់។ ចុងក្រោយ ខ្ញុំនឹងចែករំលែកវិធីសន្សំទឹក ៣ យ៉ាង។",
                steps: ["រៀបចំ opening, ចំណុចសំខាន់ ២–៣ និង closing។", "ហាត់និយាយយឺតច្បាស់ ហើយសង្កត់ធ្ងន់លើពាក្យគន្លឹះ។", "ថតសំឡេងខ្លួនឯង ស្តាប់ឡើងវិញ និងកែការបញ្ចេញសំឡេង។"],
                practice: "បង្កើត opening ២ ប្រយោគសម្រាប់បទបង្ហាញអំពីសាលារបស់អ្នក។",
                answer: "ឧទាហរណ៍៖ Good morning. Today, I’m going to introduce my school and explain what makes it special.",
                homework: "រៀបចំបទបង្ហាញ ១ នាទី មាន opening, signposts យ៉ាងតិច ២ និង closing។"
            },
            unit12: {
                vocabulary: [
                    {en: "Portfolio", pronunciation: "pɔːrtˈfoʊlioʊ", kh: "សំណុំស្នាដៃ", example: "My portfolio includes three essays."},
                    {en: "Reflection", pronunciation: "rɪˈflekʃən", kh: "ការឆ្លុះបញ្ចាំងពីការរៀន", example: "Write a reflection after the project."},
                    {en: "Strength", pronunciation: "streŋθ", kh: "ចំណុចខ្លាំង", example: "Speaking is one of my strengths."},
                    {en: "Area to improve", pronunciation: "ˈeriə tuː ɪmˈpruːv", kh: "ចំណុចដែលត្រូវកែលម្អ", example: "Pronunciation is an area to improve."},
                    {en: "Feedback", pronunciation: "ˈfiːdbæk", kh: "មតិកែលម្អ", example: "Use feedback to revise your work."},
                    {en: "Set a goal", pronunciation: "set ə ɡoʊl", kh: "កំណត់គោលដៅ", example: "I set a goal to learn five words daily."}
                ],
                objective: "សិស្សអាចប្រមូលស្នាដៃ បង្ហាញការរីកចម្រើន និងកំណត់គោលដៅបន្ទាប់ដោយប្រើភាសាឆ្លុះបញ្ចាំង។",
                grammarExplain: "ប្រើ Past Simple ដើម្បីពិពណ៌នាអ្វីដែលបានធ្វើ (I wrote three essays) និង Present Perfect សម្រាប់បទពិសោធន៍/លទ្ធផលរហូតមកដល់បច្ចុប្បន្ន (I have improved my writing)។ ប្រើ because ដើម្បីពន្យល់មូលហេតុ និង next/future goal សម្រាប់ផែនការបន្ទាប់។",
                model: "I have improved my reading this term because I practiced every week. Next, I want to speak more confidently.",
                modelKh: "ខ្ញុំបានធ្វើឱ្យការអានរបស់ខ្ញុំប្រសើរឡើងក្នុងវគ្គនេះ ព្រោះខ្ញុំបានហាត់រៀងរាល់សប្តាហ៍។ បន្ទាប់ ខ្ញុំចង់និយាយដោយមានទំនុកចិត្តជាងមុន។",
                steps: ["ជ្រើសរើសស្នាដៃមុន និងក្រោយរៀន ដើម្បីប្រៀបធៀបការរីកចម្រើន។", "សរសេរចំណុចខ្លាំងមួយ និងចំណុចត្រូវកែលម្អមួយ។", "កំណត់គោលដៅតូច អាចវាស់វែងបាន និងកាលវិភាគហាត់។"],
                practice: "បំពេញ៖ I have improved my ___ because ___. Next, I will ___.",
                answer: "ចម្លើយផ្ទាល់ខ្លួន។ ឧទាហរណ៍៖ I have improved my vocabulary because I review words daily. Next, I will practice speaking.",
                homework: "សរសេរ reflection ៦ ប្រយោគ៖ អ្វីដែលបានរៀន ចំណុចខ្លាំង ភស្តុតាងនៃការរីកចម្រើន និងគោលដៅថ្មី។"
            }
        };

        const additionalLessonParagraphs = {
            unit3: {
                title: "My Neighborhood (តំបន់ដែលខ្ញុំរស់នៅ)",
                english: "I live in a quiet neighborhood. There is a school near my house, and there are many small shops on my street. The market is next to the bus stop. To get to the library, go straight and turn right at the bridge. I like my neighborhood because the people are friendly.",
                khmer: "ខ្ញុំរស់នៅក្នុងសង្កាត់ស្ងប់ស្ងាត់មួយ។ មានសាលារៀននៅជិតផ្ទះខ្ញុំ ហើយមានហាងតូចៗជាច្រើននៅតាមផ្លូវ។ ផ្សារនៅជាប់ចំណតឡានក្រុង។ ដើម្បីទៅបណ្ណាល័យ សូមទៅត្រង់ ហើយបត់ស្តាំនៅស្ពាន។ ខ្ញុំចូលចិត្តសង្កាត់របស់ខ្ញុំ ព្រោះអ្នករស់នៅទីនោះរួសរាយរាក់ទាក់។"
            },
            unit4: {
                title: "Staying Healthy (ការថែរក្សាសុខភាព)",
                english: "I try to stay healthy every day. I eat fruit and vegetables and drink enough water. I walk to school when the weather is good. When I feel sick, I tell my parents and get some rest. My family says we should wash our hands before eating. These simple habits help us feel well.",
                khmer: "ខ្ញុំព្យាយាមថែរក្សាសុខភាពរៀងរាល់ថ្ងៃ។ ខ្ញុំញ៉ាំផ្លែឈើ និងបន្លែ ហើយផឹកទឹកឱ្យបានគ្រប់គ្រាន់។ ខ្ញុំដើរទៅសាលានៅពេលអាកាសធាតុល្អ។ ពេលខ្ញុំមិនស្រួលខ្លួន ខ្ញុំប្រាប់ឪពុកម្តាយ និងសម្រាក។ គ្រួសារខ្ញុំនិយាយថា យើងគួរលាងដៃមុនពេលញ៉ាំអាហារ។ ទម្លាប់សាមញ្ញទាំងនេះជួយឱ្យយើងមានសុខភាពល្អ។"
            },
            unit5: {
                title: "A Visit to Angkor Wat (ដំណើរទស្សនកិច្ចទៅអង្គរវត្ត)",
                english: "Last month, my family visited Angkor Wat. We left early in the morning and arrived before the temple became busy. I saw the stone galleries and took many photos. Our guide explained the history of the temple. It was one of the most interesting places I have ever visited, and I hope to return one day.",
                khmer: "កាលពីខែមុន គ្រួសារខ្ញុំបានទៅទស្សនាអង្គរវត្ត។ ពួកយើងចេញដំណើរពីព្រលឹម ហើយទៅដល់មុនពេលមានអ្នកទស្សនាច្រើន។ ខ្ញុំបានឃើញចម្លាក់តាមថែវ និងថតរូបជាច្រើន។ មគ្គុទ្ទេសក៍របស់យើងបានពន្យល់ពីប្រវត្តិប្រាសាទ។ វាជាកន្លែងមួយក្នុងចំណោមកន្លែងដែលគួរឱ្យចាប់អារម្មណ៍បំផុតដែលខ្ញុំធ្លាប់ទៅ ហើយខ្ញុំសង្ឃឹមថានឹងត្រឡប់ទៅម្តងទៀត។"
            },
            unit6: {
                title: "Rules at Our School (ច្បាប់នៅសាលារបស់យើង)",
                english: "At our school, students must arrive on time and respect one another. We must keep our classrooms clean, and we should recycle paper and plastic. Students mustn't run in the hall because someone could get hurt. We can ask teachers for help when we do not understand a lesson. These rules help everyone learn safely.",
                khmer: "នៅសាលារបស់យើង សិស្សត្រូវមកទាន់ពេល និងគោរពគ្នាទៅវិញទៅមក។ យើងត្រូវរក្សាថ្នាក់រៀនឱ្យស្អាត ហើយគួរកែច្នៃក្រដាស និងប្លាស្ទិកឡើងវិញ។ សិស្សមិនត្រូវរត់នៅតាមច្រកទេ ព្រោះអាចមានអ្នករងរបួស។ យើងអាចសុំជំនួយពីគ្រូនៅពេលមិនយល់មេរៀន។ ច្បាប់ទាំងនេះជួយឱ្យអ្នកទាំងអស់គ្នារៀនដោយសុវត្ថិភាព។"
            },
            unit7: {
                title: "A Team Research Project (គម្រោងស្រាវជ្រាវជាក្រុម)",
                english: "Our team recently carried out a survey about plastic use at school. First, we collected responses from students. Furthermore, we checked the information carefully to make sure it was reliable. The results substantiate our claim that students want more recycling bins. Rarely do small changes make such a visible difference, but this project shows that they can.",
                khmer: "ក្រុមរបស់យើងថ្មីៗនេះបានធ្វើការស្ទង់មតិអំពីការប្រើប្រាស់ប្លាស្ទិកនៅសាលា។ ជាដំបូង ពួកយើងបានប្រមូលចម្លើយពីសិស្ស។ លើសពីនេះ ពួកយើងបានពិនិត្យព័ត៌មានដោយហ្មត់ចត់ ដើម្បីធានាថាវាអាចទុកចិត្តបាន។ លទ្ធផលគាំទ្រការអះអាងរបស់យើងថា សិស្សចង់បានធុងសម្រាប់កែច្នៃសំរាមបន្ថែម។ កម្រណាស់ដែលការផ្លាស់ប្តូរតូចៗបង្កើតភាពខុសគ្នាដែលមើលឃើញច្បាស់ ប៉ុន្តែគម្រោងនេះបង្ហាញថាវាអាចធ្វើបាន។"
            },
            unit8: {
                title: "Two Different Characters (តួអង្គពីរដែលខុសគ្នា)",
                english: "In the story, Dara is the epitome of courage. When the village faces danger, he helps his neighbors, whereas Vannak chooses to hide. The writer uses the juxtaposition of their actions to show two different responses to fear. Dara's choices provide evidence that courage means helping others even when we feel afraid. Had the villagers worked together earlier, they might have solved the problem sooner.",
                khmer: "ក្នុងរឿងនេះ ដារ៉ាជាគំរូនៃភាពក្លាហាន។ នៅពេលភូមិជួបគ្រោះថ្នាក់ គាត់ជួយអ្នកជិតខាង ចំណែកឯវណ្ណៈជ្រើសរើសលាក់ខ្លួន។ អ្នកនិពន្ធដាក់សកម្មភាពរបស់ពួកគេផ្ទុយគ្នា ដើម្បីបង្ហាញពីរបៀបឆ្លើយតបចំពោះការភ័យខ្លាចពីរផ្សេងគ្នា។ ការសម្រេចចិត្តរបស់ដារ៉ាបង្ហាញថា ភាពក្លាហានមានន័យថាជួយអ្នកដទៃ ទោះបីយើងមានអារម្មណ៍ភ័យក៏ដោយ។ ប្រសិនបើអ្នកភូមិបានសហការគ្នាមុននេះ ពួកគេប្រហែលជាអាចដោះស្រាយបញ្ហាបានលឿនជាងនេះ។"
            },
            unit9: {
                title: "A Reading Strategy (យុទ្ធសាស្ត្រអាន)",
                english: "When I read an article, I first look at the title and headings to understand its general topic. This is called skimming. Then I read the questions and underline keywords. If a question asks for a date, I scan the passage for numbers and check the surrounding sentences. I also look for paraphrases because the passage may express the same idea using different words. These steps help me find evidence and avoid guessing.",
                khmer: "នៅពេលខ្ញុំអានអត្ថបទ ខ្ញុំមើលចំណងជើង និងចំណងជើងរងជាមុន ដើម្បីយល់ពីប្រធានបទទូទៅ។ វាហៅថា skimming។ បន្ទាប់មក ខ្ញុំអានសំណួរ និងគូសពាក្យគន្លឹះ។ បើសំណួរសួររកកាលបរិច្ឆេទ ខ្ញុំស្វែងរកលេខក្នុងអត្ថបទ ហើយពិនិត្យប្រយោគជុំវិញវា។ ខ្ញុំក៏ស្វែងរកការប្រើពាក្យផ្សេងដែលមានន័យដូចគ្នា ព្រោះអត្ថបទអាចបង្ហាញគំនិតដដែលដោយប្រើពាក្យផ្សេង។ ជំហានទាំងនេះជួយឱ្យខ្ញុំរកភស្តុតាង និងជៀសវាងការទាយ។"
            },
            unit10: {
                title: "Why Students Should Read (ហេតុអ្វីសិស្សគួរអាន)",
                english: "Reading every day is a useful habit for students. It helps us learn new vocabulary and understand how English sentences are organized. For example, students can read a short story and write down five new words. Although some books are difficult at first, choosing a topic we enjoy makes reading easier. Therefore, schools and families should encourage young people to read regularly.",
                khmer: "ការអានរៀងរាល់ថ្ងៃជាទម្លាប់មានប្រយោជន៍សម្រាប់សិស្ស។ វាជួយឱ្យយើងរៀនវាក្យសព្ទថ្មី និងយល់ពីរបៀបរៀបចំប្រយោគអង់គ្លេស។ ឧទាហរណ៍ សិស្សអាចអានរឿងខ្លីមួយ ហើយកត់ពាក្យថ្មីចំនួនប្រាំ។ ទោះបីសៀវភៅខ្លះពិបាកនៅដំបូងក៏ដោយ ការជ្រើសរើសប្រធានបទដែលយើងចូលចិត្តធ្វើឱ្យការអានកាន់តែងាយស្រួល។ ដូច្នេះ សាលារៀន និងគ្រួសារគួរលើកទឹកចិត្តយុវជនឱ្យអានជាប្រចាំ។"
            },
            unit11: {
                title: "My Class Presentation (បទបង្ហាញក្នុងថ្នាក់របស់ខ្ញុំ)",
                english: "Good morning, everyone. Today, I am going to talk about keeping our school clean. First, I will explain why a clean school is important. Next, I will share two actions students can take: using bins and reducing plastic. For example, our class can bring reusable water bottles. Finally, I will summarize the main ideas and answer your questions. Thank you for listening.",
                khmer: "អរុណសួស្តីអ្នកទាំងអស់គ្នា។ ថ្ងៃនេះ ខ្ញុំនឹងនិយាយអំពីការរក្សាសាលារៀនឱ្យស្អាត។ ជាដំបូង ខ្ញុំនឹងពន្យល់ថាហេតុអ្វីសាលាស្អាតមានសារៈសំខាន់។ បន្ទាប់មក ខ្ញុំនឹងចែករំលែកសកម្មភាពពីរដែលសិស្សអាចធ្វើបាន៖ ប្រើធុងសំរាម និងកាត់បន្ថយប្លាស្ទិក។ ឧទាហរណ៍ ថ្នាក់របស់យើងអាចយកដបទឹកប្រើឡើងវិញបាន។ ចុងក្រោយ ខ្ញុំនឹងសង្ខេបគំនិតសំខាន់ៗ និងឆ្លើយសំណួររបស់អ្នក។ អរគុណដែលបានស្តាប់។"
            },
            unit12: {
                title: "My English Learning Journey (ដំណើររៀនភាសាអង់គ្លេសរបស់ខ្ញុំ)",
                english: "This year, I have learned many new English words and grammar patterns. At first, I was shy when I spoke, but I practiced with my classmates every week. I have become more confident because I can now introduce myself, describe my routine, and share my opinions. My portfolio shows how my writing has improved. Next, I will practice speaking every day so I can communicate more fluently.",
                khmer: "ក្នុងឆ្នាំនេះ ខ្ញុំបានរៀនពាក្យ និងទម្រង់វេយ្យាករណ៍អង់គ្លេសថ្មីៗជាច្រើន។ ដំបូង ខ្ញុំខ្មាសអៀនពេលនិយាយ ប៉ុន្តែខ្ញុំបានហាត់ជាមួយមិត្តរួមថ្នាក់រៀងរាល់សប្តាហ៍។ ខ្ញុំមានទំនុកចិត្តជាងមុន ព្រោះឥឡូវនេះខ្ញុំអាចណែនាំខ្លួន ពិពណ៌នាទម្លាប់ និងចែករំលែកមតិបាន។ សំណុំស្នាដៃរបស់ខ្ញុំបង្ហាញថាការសរសេររបស់ខ្ញុំបានប្រសើរឡើងយ៉ាងដូចម្តេច។ បន្ទាប់ ខ្ញុំនឹងហាត់និយាយរៀងរាល់ថ្ងៃ ដើម្បីឱ្យខ្ញុំអាចប្រាស្រ័យទាក់ទងបានកាន់តែស្ទាត់។"
            }
        };

        const grammarConversationPath = {
            unit1: {
                level: "កម្រិត 1 — ចាប់ផ្តើម",
                focus: "ប្រយោគខ្លី និងកិរិយាសព្ទ Be",
                pattern: "I am + name/age/job. | My name is + name. | What is your name?",
                explanation: "ប្រើ I am ដើម្បីប្រាប់អំពីខ្លួនឯង និង My name is ដើម្បីប្រាប់ឈ្មោះ។ ក្នុងសំណួរ What is your name? សំឡេងឡើងនៅចុងសំណួរ។",
                example: "A: Hello! What is your name? B: My name is Lina. I am a student.",
                speaking: "ណែនាំខ្លួនរយៈពេល ៣០ វិនាទី៖ សួរសុខទុក្ខ ប្រាប់ឈ្មោះ អាយុ និងសាលា។"
            },
            unit2: {
                level: "កម្រិត 2 — និយាយពីទម្លាប់",
                focus: "Present Simple និងសំណួរ Do/Does",
                pattern: "I/You/We/They + verb. | He/She + verb-s. | Do/Does + subject + verb?",
                explanation: "ប្រើ Present Simple សម្រាប់ទម្លាប់។ បន្ថែម -s/-es តែពេលប្រធានជា he, she ឬ it។ ក្នុងសំណួរ Does មាន s រួចហើយ ដូច្នេះកិរិយាសព្ទក្រោយត្រឡប់ទៅទម្រង់ដើម។",
                example: "A: What time do you wake up? B: I wake up at six. A: Does your sister wake up early? B: Yes, she does.",
                speaking: "សួរ និងឆ្លើយពីម៉ោងភ្ញាក់ អាហារ សាលា និងម៉ោងចូលគេង។"
            },
            unit3: {
                level: "កម្រិត 3 — ពិពណ៌នាទីកន្លែង",
                focus: "There is/are, prepositions និងប្រយោគបញ្ជា",
                pattern: "There is + singular. | There are + plural. | Go straight. Turn left/right.",
                explanation: "ប្រើ There is សម្រាប់វត្ថុមួយ និង There are សម្រាប់វត្ថុច្រើន។ ប្រើ next to/across from ដើម្បីប្រាប់ទីតាំង។ ពេលផ្តល់ទិសដៅ ប្រើកិរិយាសព្ទដើមដោយមិនដាក់ប្រធាន។",
                example: "A: Is there a market near here? B: Yes. Go straight. It is across from the school.",
                speaking: "ប្រើផែនទីសួរផ្លូវទៅកាន់ផ្សារ ឬសាលា ហើយឆ្លើយដោយមានយ៉ាងតិច ២ ជំហាន។"
            },
            unit4: {
                level: "កម្រិត 4 — សុំជំនួយ និងផ្តល់ដំបូន្មាន",
                focus: "Have/has និង modal verbs should/can",
                pattern: "I have + symptom. | You should + verb. | Can I + verb?",
                explanation: "ប្រើ have/has ដើម្បីប្រាប់រោគសញ្ញា។ Should + កិរិយាសព្ទដើមសម្រាប់ដំបូន្មាន; can សម្រាប់សមត្ថភាព ឬសុំការអនុញ្ញាត។ ក្រោយ modal verb មិនបន្ថែម -s ទេ។",
                example: "A: I have a headache. B: You should rest. A: Can I drink some water? B: Yes, you can.",
                speaking: "សម្តែងជាអ្នកជំងឺ និងអ្នកផ្តល់ដំបូន្មាន៖ ប្រាប់រោគសញ្ញា សួរជំនួយ និងឆ្លើយតប។"
            },
            unit5: {
                level: "កម្រិត 5 — រៀបរាប់បទពិសោធន៍",
                focus: "Past Simple និងការប្រៀបធៀប",
                pattern: "Subject + past verb + time. | A is more + adjective + than B.",
                explanation: "ប្រើ Past Simple ជាមួយពេលវេលាដែលបានបញ្ចប់ ដូចជា yesterday និង last week។ កិរិយាសព្ទទៀងទាត់បន្ថែម -ed; កិរិយាសព្ទមិនទៀងទាត់មានទម្រង់ពិសេស ដូចជា go → went។",
                example: "A: Where did you go last weekend? B: I went to Angkor Wat. It was more beautiful than I expected.",
                speaking: "និយាយពីដំណើរកម្សាន្តកន្លងមក៖ ទៅណា ធ្វើអ្វី និងចូលចិត្តអ្វីជាងគេ។"
            },
            unit6: {
                level: "កម្រិត 6 — បន្តការសន្ទនា",
                focus: "Modal verbs, obligation និង question tags",
                pattern: "must/should/can + base verb. | Positive statement, negative tag?",
                explanation: "Must បង្ហាញកាតព្វកិច្ចខ្លាំង; should ជាដំបូន្មាន; can ជាសមត្ថភាព/ការអនុញ្ញាត។ Question tag ប្រើ auxiliary ផ្ទុយនឹងប្រយោគមេ ដើម្បីបញ្ជាក់ និងបន្តការសន្ទនា។",
                example: "A: We should recycle these bottles, shouldn't we? B: Yes, we should. We can reuse them.",
                speaking: "ពិភាក្សាច្បាប់ថ្នាក់រៀន ឬការថែរក្សាបរិស្ថាន ដោយប្រើ modal verb ២ និង question tag ១។"
            },
            unit7: {
                level: "កម្រិត 7 — និយាយក្នុងបរិបទវិជ្ជាជីវៈ",
                focus: "ភ្ជាប់គំនិត និង inversion",
                pattern: "First/Furthermore/However + clause. | Rarely/Never + auxiliary + subject + verb.",
                explanation: "ប្រើ discourse markers ដើម្បីបង្ហាញលំដាប់ បន្ថែម ឬផ្ទុយគំនិត។ នៅកម្រិតផ្លូវការ ពាក្យអវិជ្ជមានដូចជា Never នៅដើមប្រយោគធ្វើឱ្យ auxiliary មកមុខប្រធាន៖ Never have I seen...។",
                example: "A: What does the report show? B: First, it identifies the risk. Furthermore, it supports the claim with reliable data.",
                speaking: "រាយការណ៍ពីបញ្ហាមួយក្នុងថ្នាក់ ឬការងារ ដោយប្រើ First, Furthermore និង However។"
            },
            unit8: {
                level: "កម្រិត 8 — ពន្យល់មតិ និងតស៊ូមតិ",
                focus: "Claim, evidence, whereas និង conditional",
                pattern: "I believe + claim because + reason. | Whereas + contrasting clause.",
                explanation: "រៀបអំណះអំណាងជា ៣ ផ្នែក៖ ប្រាប់មតិ (claim), ផ្តល់ភស្តុតាង (evidence), ពន្យល់ការភ្ជាប់ (reasoning)។ ប្រើ whereas ដើម្បីប្រៀបធៀបគំនិតផ្ទុយ។ Conditional អាចប្រើ Had + subject + past participle ជំនួស If។",
                example: "A: Why is the character brave? B: I believe she is brave because she protects others, whereas the antagonist avoids danger.",
                speaking: "ជ្រើសរើសតួអង្គ ឬគំនិតមួយ ប្រាប់មតិ ផ្តល់ហេតុផល និងប្រៀបធៀបជាមួយគំនិតផ្ទុយ។"
            },
            unit9: {
                level: "កម្រិត 9 — សួរ និងសង្ខេបព័ត៌មាន",
                focus: "Wh-questions, paraphrasing និង reported ideas",
                pattern: "What/Where/When/Why + auxiliary + subject + verb? | The text says that + idea.",
                explanation: "ប្រើ Wh-questions ដើម្បីស្វែងរកប្រភេទព័ត៌មានផ្សេងៗ។ ក្រោយស្វែងរកចម្លើយក្នុងអត្ថបទ សង្ខេបដោយពាក្យខ្លួនឯង មិនចាំបាច់ចម្លងប្រយោគដើមទាំងស្រុង។",
                example: "A: What does the passage explain? B: It explains why the river is important and says that local people depend on it.",
                speaking: "អានកថាខណ្ឌខ្លីមួយ បង្កើតសំណួរ What/Why ហើយសង្ខេបចម្លើយជាមួយដៃគូ។"
            },
            unit10: {
                level: "កម្រិត 10 — បង្កើតប្រយោគស្មុគស្មាញ",
                focus: "Because/although/which និងការតភ្ជាប់អំណះអំណាង",
                pattern: "Main idea + because + reason. | Although + contrast, main clause. | noun + which + detail.",
                explanation: "ប្រើ because ដើម្បីផ្តល់មូលហេតុ, although ដើម្បីបង្ហាញភាពផ្ទុយ និង which ដើម្បីបន្ថែមព័ត៌មានអំពីនាម។ ប្រយោគទាំងនេះជួយឱ្យការនិយាយ និង essay មានការពន្យល់ច្បាស់ជាងប្រយោគខ្លីៗ។",
                example: "A: Why should students read daily? B: They should read daily because it builds vocabulary, although some students find it difficult at first.",
                speaking: "ពន្យល់មតិមួយក្នុង ៣ ប្រយោគ ដោយប្រើ because, although និងឧទាហរណ៍គាំទ្រ។"
            },
            unit11: {
                level: "កម្រិត 11 — បទបង្ហាញ និងការសន្ទនាស្ទាត់",
                focus: "Future forms, signposting និងការឆ្លើយសំណួរ",
                pattern: "I will + verb. | I am going to + verb. | First/Next/Finally + idea.",
                explanation: "ប្រើ be going to សម្រាប់ផែនការដែលបានគ្រោងទុក និង will សម្រាប់ការសម្រេចចិត្តភ្លាមៗ ឬការសន្យា។ ប្រើឃ្លា signposting ដើម្បីឱ្យអ្នកស្តាប់តាមលំដាប់ ហើយប្រើ Could you repeat that? ពេលមិនយល់សំណួរ។",
                example: "A: What are you going to present? B: I am going to present our project. First, I will explain the problem. Finally, I will answer your questions.",
                speaking: "ធ្វើបទបង្ហាញ ១ នាទី ហើយអនុវត្តសំណួរចម្លើយ ២ ដង ដោយស្នើឱ្យអ្នកសួរនិយាយម្ដងទៀត ប្រសិនបើចាំបាច់។"
            },
            unit12: {
                level: "កម្រិត 12 — និយាយដោយទំនុកចិត្ត",
                focus: "Present Perfect, reflection និងគោលដៅអនាគត",
                pattern: "I have + past participle. | I have improved... because... | Next, I will...",
                explanation: "Present Perfect ភ្ជាប់បទពិសោធន៍ ឬការរីកចម្រើនពីអតីតកាលមកដល់បច្ចុប្បន្ន។ ប្រើ because ដើម្បីពន្យល់មូលហេតុ និង Next, I will ដើម្បីបង្ហាញគោលដៅបន្ទាប់។",
                example: "A: What have you improved this year? B: I have improved my speaking because I practice every week. Next, I will learn to speak more fluently.",
                speaking: "សន្ទនា ១–២ នាទីអំពីអ្វីដែលបានរៀន ចំណុចខ្លាំង និងគោលដៅបន្ទាប់ ដោយនិយាយជាប្រយោគពេញលេញ។"
            }
        };

        function getCustomLessons() {
            let custom = localStorage.getItem('ef_custom');
            return custom ? JSON.parse(custom) : [];
        }

        function renderLessons() {
            const selectedBook = document.getElementById('book-select').value;
            const searchText = document.getElementById('search-input').value.toLowerCase();
            const container = document.getElementById('lessons-container');
            container.innerHTML = '';

            let allLessons = [...baseLessonsData, ...getCustomLessons()];
            const filtered = allLessons.filter(lesson => {
                const guide = lessonTeachingGuides[lesson.unitKey];
                const lessonVocabulary = [...(lesson.vocab || []), ...(guide ? guide.vocabulary : [])];
                const matchesBook = (selectedBook === 'all' || lesson.unitKey === selectedBook);
                const matchesSearch = (lesson.title || '').toLowerCase().includes(searchText) ||
                    lessonVocabulary.some(v =>
                        (v.en || '').toLowerCase().includes(searchText) ||
                        (v.kh || '').toLowerCase().includes(searchText)
                    );
                return matchesBook && matchesSearch;
            });

            if (filtered.length === 0) {
                container.innerHTML = '<p style="text-align: center; padding: 2rem;">មិនមានទិន្នន័យមេរៀនត្រូវគ្នានឹងការស្វែងរកទេ។</p>';
                return;
            }

            filtered.forEach((lesson) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'accordion';
                const guide = lessonTeachingGuides[lesson.unitKey];
                const paragraph = guide && guide.paragraph
                    ? guide.paragraph
                    : additionalLessonParagraphs[lesson.unitKey];
                const safeLesson = {
                    unitNum: escapeHtml(lesson.unitNum || 'Unit'),
                    title: escapeHtml(lesson.title || 'Untitled Lesson'),
                    dialogueEn: escapeHtml(lesson.dialogueEn || ''),
                    dialogueKh: escapeHtml(lesson.dialogueKh || ''),
                    grammar: escapeHtml(lesson.grammar || ''),
                    exercise: escapeHtml(lesson.exercise || ''),
                    vocab: [...(lesson.vocab || []), ...(guide ? guide.vocabulary : [])].map(v => ({
                        en: escapeHtml(v.en || ''),
                        pronunciation: escapeHtml(v.pronunciation || ''),
                        kh: escapeHtml(v.kh || ''),
                        example: escapeHtml(v.example || '')
                    }))
                };
                const safeGuide = guide ? {
                    objective: escapeHtml(guide.objective),
                    grammarExplain: escapeHtml(guide.grammarExplain),
                    model: escapeHtml(guide.model),
                    modelKh: escapeHtml(guide.modelKh),
                    paragraph: paragraph ? {
                        title: escapeHtml(paragraph.title),
                        english: escapeHtml(paragraph.english),
                        khmer: escapeHtml(paragraph.khmer)
                    } : null,
                    steps: guide.steps.map(step => escapeHtml(step)),
                    practice: escapeHtml(guide.practice),
                    answer: escapeHtml(guide.answer),
                    homework: escapeHtml(guide.homework)
                } : null;
                const grammarPath = grammarConversationPath[lesson.unitKey];
                const safeGrammarPath = grammarPath ? {
                    level: escapeHtml(grammarPath.level),
                    focus: escapeHtml(grammarPath.focus),
                    pattern: escapeHtml(grammarPath.pattern),
                    explanation: escapeHtml(grammarPath.explanation),
                    example: escapeHtml(grammarPath.example),
                    speaking: escapeHtml(grammarPath.speaking)
                } : null;
                itemDiv.innerHTML = `
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>📌 ${safeLesson.unitNum}: ${safeLesson.title}</span>
                        <span>▼</span>
                    </div>
                    <div class="accordion-content">
                        ${safeGuide ? `
                        <div class="teaching-box">
                            <p><strong>🎯 គោលបំណងមេរៀន (Learning objectives)</strong></p>
                            <p>${safeGuide.objective}</p>
                        </div>` : ''}
                        ${safeGuide && safeGuide.paragraph ? `
                        <div class="paragraph-box">
                            <p><strong>📝 Paragraph គំរូ៖ ${safeGuide.paragraph.title}</strong></p>
                            <p class="paragraph-english">${safeGuide.paragraph.english}</p>
                            <p class="paragraph-khmer">${safeGuide.paragraph.khmer}</p>
                        </div>` : ''}
                        <p><strong>១. វាក្យសព្ទគន្លឹះ (Key Vocabulary):</strong></p>
                        <table class="vocab-table">
                            <thead><tr><th>English Word</th><th>ការអាន (IPA)</th><th>ប្រែសម្រួលជាភាសាខ្មែរ</th><th>ឧទាហរណ៍ប្រើប្រាស់</th></tr></thead>
                            <tbody>
                                ${safeLesson.vocab.map(v => `<tr><td><strong>${v.en}</strong></td><td>${v.pronunciation || '—'}</td><td>${v.kh}</td><td>${v.example || '—'}</td></tr>`).join('')}
                            </tbody>
                        </table>
                        <div class="dialogue-box">
                            <p><strong>២. កិច្ចសន្ទនាគំរូ (Sample Dialogue):</strong></p>
                            <p style="white-space: pre-line; margin-top: 0.5rem;"><em>English:</em><br>${safeLesson.dialogueEn}</p>
                            <p style="white-space: pre-line; margin-top: 0.5rem; color: var(--accent);"><em>ភាសាខ្មែរ:</em><br>${safeLesson.dialogueKh}</p>
                            <button type="button" class="btn dialogue-audio">🔊 ស្តាប់ការសន្ទនា (TTS)</button>
                        </div>
                        <div class="grammar-box">
                            <p><strong>៣. ចំណុចវេយ្យាករណ៍ (Grammar Focus):</strong></p>
                            <p>${safeLesson.grammar}</p>
                            ${safeGrammarPath ? `
                            <div class="grammar-path-card">
                                <p class="grammar-level">${safeGrammarPath.level}</p>
                                <h4>${safeGrammarPath.focus}</h4>
                                <p class="grammar-pattern"><strong>រូបមន្ត៖</strong> ${safeGrammarPath.pattern}</p>
                                <p class="lesson-explanation"><strong>គ្រូពន្យល់៖</strong> ${safeGrammarPath.explanation}</p>
                                <p class="lesson-model"><strong>សន្ទនាគំរូ៖</strong> ${safeGrammarPath.example}</p>
                                <p class="conversation-task"><strong>🎙️ ហាត់និយាយ៖</strong> ${safeGrammarPath.speaking}</p>
                            </div>` : ''}
                            ${safeGuide ? `<p class="lesson-explanation"><strong>ពន្យល់ជាជំហាន៖</strong> ${safeGuide.grammarExplain}</p>
                            <p class="lesson-model"><strong>ឧទាហរណ៍៖</strong> ${safeGuide.model}<br><span>${safeGuide.modelKh}</span></p>
                            <ol class="teaching-steps">${safeGuide.steps.map(step => `<li>${step}</li>`).join('')}</ol>` : ''}
                        </div>
                        <div class="exercise-box">
                            <p><strong>៤. លំហាត់អនុវត្ត (Practice Exercise):</strong></p>
                            <p>${safeLesson.exercise}</p>
                            ${safeGuide ? `<p class="lesson-practice"><strong>ហាត់អនុវត្តជាមួយគ្រូ៖</strong> ${safeGuide.practice}</p>
                            <details class="answer-details"><summary>មើលចម្លើយ និងការពន្យល់</summary><p>${safeGuide.answer}</p></details>
                            <p class="lesson-homework"><strong>កិច្ចការផ្ទះ៖</strong> ${safeGuide.homework}</p>` : ''}
                        </div>
                    </div>
                `;
                itemDiv.querySelector('.dialogue-audio').addEventListener('click', () => {
                    speak((lesson.dialogueEn || '').replace(/\n/g, ' '));
                });
                container.appendChild(itemDiv);
            });
            updateStats();
        }

        function toggleAccordion(header) {
            const content = header.nextElementSibling;
            if (!content) return;
            content.classList.toggle('open');
        }

        function switchTab(tabName, event) {
            document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            const targetTab = document.getElementById('tab-' + tabName);
            if (targetTab) targetTab.style.display = 'block';
            const activeButton = event && event.currentTarget ? event.currentTarget : document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
            if (activeButton) activeButton.classList.add('active');
            if(tabName === 'matching') initMatchingGame();
        }

        function speak(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                let utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            } else {
                alert('ប្រព័ន្ធរុករករបស់អ្នកមិនគាំទ្រសំឡេងអានទេ។');
            }
        }

        function checkReviewAnswer(qNum, isCorrect, btnElement) {
            const msg = document.getElementById('review-msg-' + qNum);
            const parentCard = btnElement.parentElement;
            parentCard.querySelectorAll('.quiz-option').forEach(opt => opt.style.pointerEvents = 'none');

            if (isCorrect) {
                msg.style.color = 'var(--secondary)';
                msg.textContent = '✅ ត្រឹមត្រូវច្បាស់ណាស់! ពូកែណាស់!';
                btnElement.style.background = 'rgba(16, 185, 129, 0.2)';
                stars += 1;
                solved += 1;
                localStorage.setItem('ef_stars', stars);
                localStorage.setItem('ef_solved', solved);
                updateStats();
            } else {
                msg.style.color = 'var(--danger)';
                msg.textContent = '❌ មិនទាន់ត្រឹមត្រូវទេ!';
                btnElement.style.background = 'rgba(239, 68, 68, 0.2)';
            }
        }

        // Matching Game Logic
        const vocabPairs = [
            {en: "Ubiquitous", kh: "ដែលមានគ្រប់ទីកន្លែង"},
            {en: "Pragmatic", kh: "ជាក់ស្តែងនិយម"},
            {en: "Substantiate", kh: "បញ្ជាក់ភស្តុតាង"},
            {en: "Epitome", kh: "គំរូដ៏ល្អឯក"},
            {en: "Paradigm", kh: "គំរូស្តង់ដារ"},
            {en: "Conundrum", kh: "បញ្ហាស្មុគស្មាញ"}
        ];
        let selectedMatch = null;
        let matchedCount = 0;

        function initMatchingGame() {
            const container = document.getElementById('matching-container');
            container.innerHTML = '';
            document.getElementById('match-status').textContent = '';
            matchedCount = 0;
            selectedMatch = null;

            let items = [];
            vocabPairs.forEach((p, idx) => {
                items.push({text: p.en, type: 'en', id: idx});
                items.push({text: p.kh, type: 'kh', id: idx});
            });
            items.sort(() => Math.random() - 0.5);

            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'match-item';
                div.textContent = item.text;
                div.dataset.id = item.id;
                div.dataset.type = item.type;
                div.onclick = () => selectMatchItem(div);
                container.appendChild(div);
            });
        }

        function selectMatchItem(el) {
            if(el.classList.contains('matched') || el.classList.contains('selected')) return;

            if(!selectedMatch) {
                selectedMatch = el;
                el.classList.add('selected');
            } else {
                if(selectedMatch.dataset.id === el.dataset.id && selectedMatch.dataset.type !== el.dataset.type) {
                    selectedMatch.classList.remove('selected');
                    selectedMatch.classList.add('matched');
                    el.classList.add('matched');
                    selectedMatch = null;
                    matchedCount++;
                    if(matchedCount === vocabPairs.length) {
                        document.getElementById('match-status').textContent = '🎉 សូមអបអរសាទរ! អ្នកបានផ្គូផ្គងត្រូវទាំងអស់!';
                        stars += 3;
                        solved += vocabPairs.length;
                        localStorage.setItem('ef_stars', stars);
                        localStorage.setItem('ef_solved', solved);
                        updateStats();
                    }
                } else {
                    selectedMatch.classList.remove('selected');
                    selectedMatch = null;
                }
            }
        }

        function addNewLesson(event) {
            event.preventDefault();
            const title = document.getElementById('admin-title').value;
            const vocabRaw = document.getElementById('admin-vocab').value;
            const dialogue = document.getElementById('admin-dialogue').value;
            const grammar = document.getElementById('admin-grammar').value;
            const exercise = document.getElementById('admin-exercise').value;

            let vocabList = vocabRaw.split(',').map(item => {
                let parts = item.split(':');
                return { en: parts[0] ? parts[0].trim() : '', kh: parts[1] ? parts[1].trim() : '' };
            });

            let newLesson = {
                unitKey: "custom", unitNum: "Custom Unit",
                title: title, vocab: vocabList, dialogueEn: dialogue,
                dialogueKh: "ការបកប្រែផ្ទាល់ខ្លួន", grammar: grammar, exercise: exercise
            };

            let custom = getCustomLessons();
            custom.push(newLesson);
            localStorage.setItem('ef_custom', JSON.stringify(custom));
            alert('✅ បានរក្សាទុកមេរៀនថ្មីដោយជោគជ័យ!');
            document.getElementById('add-lesson-form').reset();
            switchTab('curriculum');
            document.getElementById('book-select').value = 'custom';
            renderLessons();
        }

        function clearCustomLessons() {
            if(confirm('តើអ្នកពិតជាចង់លុបមេរៀនបន្ថែមទាំងអស់មែនទេ?')) {
                localStorage.removeItem('ef_custom');
                renderLessons();
                alert('🗑️ បានលុបមេរៀនបន្ថែមរួចរាល់!');
            }
        }

        function exportData() {
            let data = {
                custom: getCustomLessons(),
                stars: stars,
                solved: solved
            };
            let blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'english_for_you_backup.json';
            a.click();
        }

        function importData(event) {
            let file = event.target.files[0];
            if(!file) return;
            let reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let data = JSON.parse(e.target.result);
                    if(data.custom) localStorage.setItem('ef_custom', JSON.stringify(data.custom));
                    if(data.stars !== undefined) { stars = data.stars; localStorage.setItem('ef_stars', stars); }
                    if(data.solved !== undefined) { solved = data.solved; localStorage.setItem('ef_solved', solved); }
                    alert('✅ បានទាញយកទិន្នន័យចូលប្រព័ន្ធដោយជោគជ័យ!');
                    renderLessons();
                } catch(err) {
                    alert('❌ ខូចខាតទម្រង់ហើយ JSON!');
                }
            };
            reader.readAsText(file);
        }

        window.onload = () => {
            updateUserBadge();
            renderLessons();
            updateStats();
        };
    