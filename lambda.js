"use strict"; /* Documentation: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs */

var Alexa = require("alexa-sdk");

const isDebug = true;

const game_state = {
    START: 'START',
    RETURNING: 'RETURNING',
    GAME: 'GAME',
    UNHANDLED: 'UNHANDLED',
    IGNORE: 'IGNORE',
    REPEAT: 'REPEAT',
    HELP: 'HELP'
};

const game_progress = {
    PROLOGUE: 'PROLOGUE',
    PART_1: 'PART_1',
    PART_2: 'PART_2',
    PART_3: 'PART_3',
    EPILOGUE: 'EPILOGUE',
    END: 'END'
};

var belowScript = {
    'START': {
        text: `Welcome to Below, an interactive fiction you play by talking to a person through the radio. You can always say 'I need help' if you are stuck. `
    },
    'RETURNING': {
        text: `Welcome back to Below, you can restart the game by saying start over. `
    },
    'UNHANDLED': {
        text: `I am not sure what you mean. Let me repeat myself here. `
    },
    'IGNORE': {
        text: `I didn't catch that. `
    },
    'REPEAT': {
        text: `Sorry I wasn't very clear. `
    },
    'END': {
        text: `You have finished the first chapter of Below. The second chapter is still under development. You can start over and uncover more stories below the surface.`
    },
    'HELP': {
        text: [
            `You can ask questions like ... `,
            `Try saying something like ... `,
            `Maybe try ... `
        ]
    },

    /* PROLOGUE */
    'FIRST': {
        text: `You're alone, manning your ship on a voyage through the Philippine Sea when you hear your radio: Hello? `,
        options: [
            {
                next: 'HELLO',
                triggers: ['anything']
            }
        ],
        prompt: ` hello`,
    },
    'HELLO': {
        text: `Hello? Can anyone hear me? Please... Anyone.`,
        options: [
            {
                next: 'THANK_GOD',
                triggers: ['anything']
            }
        ],
        prompt: ` 'I can hear you'`,
    },

    /* PART 1 */
    'THANK_GOD': {
        text: `Thank god. Yes! I was about to give up. It was terrible...`, // "Oh my god. Yes! Thank god. I was about to give up. It was terrible..."
        prompt: ` 'what is happening', or 'who are you'`
    },
    'SELF_INTRODUCTION': {
        text: `This is Jesse Harper. I'm a bioengineer currently training under Doctor Sloane Lee. But she's not doing very well. I'm not sure what's wrong with her`,
        prompt: ` 'where are you'`,
    },
    'UNCONSCIOUS': {
        text: `I'm not entirely sure. My captain she ... she's unconscious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock`,
        prompt: ` 'what kind of samples' or 'what is air lock'`,
    },
    'EXPLAIN_SUBMARINE': {
        text: `We're in a submarine, and our entire expedition has been underwater.`,
        prompt: ` 'where are you exploring'`,
    },
    'EXPLAIN_SAMPLE': {
        text: `For the past two weeks, we've been doing research and trying to find a sample of the medicinal plant, Selca Lexorium. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples. Then something went wrong.`,
        prompt: ` 'what is sub'`,
    },
    'NEED_INTRODUCTION': { // When Jesse forgot to introduce himself at first
        text: `Ah right. Ok, I need to explain myself. Sorry. This is Jesse Harper. I'm a bioengineer and currently Doctor Sloane Lee's apprentice. `,
        options: [
            {
                next: 'KIND_OF_ILLEGAL',
                triggers: ['anything']
            }
        ],
        prompt: ` 'kind of what?'`,
    },
    'EXPLORATION': {
        text: `Actually, We are exploring The Mariana Trench... Our project is pretty huge and also, kind of, well...`,
        options: [
            {
                next: 'KIND_OF_ILLEGAL',
                triggers: ['anything']
            }
        ],
        prompt: ` 'kind of what?'`,
    },
    'KIND_OF_ILLEGAL': {
        text: `Kind of illegal. But listen, you can ask me more questions later. Right now, I'm worried about Captain Lee`,
        prompt: ` 'what is her situation' or 'why is it illegal?'`,
    },
    'THE_ILLEGALITY': {
        text: `The illegality makes our work seem worse than it actually is... Basically, exploration of this area of the trench is restricted. Only the government and the very specific researchers they select have access to this area, also...`,
        options: [
            {
                next: 'STOLE',
                triggers: ['anything']
            }
        ],
        prompt: ` 'yes?'`,
    },
    'STOLE': {
        text: `Also... We stole some things`,
        options: [
            {
                next: 'STOLE_FROM',
                triggers: ['AskWho']
            },
            {
                next: 'STOLE_RESEARCH',
                triggers: ['AskWhat', 'AskSituation']
            }
        ],
        prompt: ` 'stole from who?' or 'What did you steal?'`,
    },
    'STOLE_FROM': {
        text: `From... the government`,
        options: [
            {
                next: 'EXPLAIN_RESEARCH',
                triggers: ['AskSituation']
            },
            {
                next: 'STOLE_RESEARCH',
                triggers: ['AskWhat']
            }
        ],
        prompt: ` 'stole from who?' or 'what did you do?'`,
    },
    'STOLE_RESEARCH': {
        text: `Research`,
        options: [
            {
                next: 'STOLE_FROM',
                triggers: ['AskWho']
            },
            {
                next: 'EXPLAIN_RESEARCH',
                triggers: ['AskSituation']
            }
        ],
        prompt: ` 'stole from who' or 'what did you do'`,
    },
    'EXPLAIN_RESEARCH': {
        text: `I know! I know. But listen, someone's dig around in this place. What are they keeping from us down here? The rest of the Mariana's been relatively open for decades. Especially for scientists with meaningful research like Doctor Lee! Once the Captain and I started our studies and realized that the Selcal Lexorium originated from this area... Well, she's not really the type to let the law get in the way of scientific progress. Our research is for the greater good! We could help thousands.`,
        options: [
            {
                next: 'CONTINUE_SITUATION',
                triggers: ['anything']
            }
        ],
        prompt: ` 'I will help you'`,
    },
    'EXPLAIN_HER': {
        text: `Doctor Sloane Lee is a captain. And doctor. Both. She's very intelligent and diversely qualified.`,
        // options: [
        //     {
        //         next: 'HER_SITUATION',
        //         triggers: ['anything']
        //     }
        // ]
        prompt: '',
    },

    /* PART 2 */
    'CONTINUE_SITUATION': {
        text: `And now we've been talking too long. I should get back to her. She's still on the ground in her suit. I dragged her out of the airlock and removed her helmet. Her face is quite red. What should I do here? `,
        options: [
            {
                next: 'TRY_MOVE',
                triggers: ['Command_Move']
            },
            {
                next: 'PRESSURIZED_SUIT',
                triggers: ['Command_Remove']
            }
        ],
        prompt: ` 'is she breathing?' or 'lay her down on a bed`,
    },
    'HER_SITUATION': {
        text: `She's still on the ground in her suit. I dragged her out of the airlock and removed her helmet. Her face is quite red. What should I do here? `,
        options: [
            {
                next: 'TRY_MOVE',
                triggers: ['Command_Mo']
            },
            {
                next: 'PRESSURIZED_SUIT',
                triggers: ['Command_Remove']
            }
        ],
        prompt: ` 'is she breathing?' or 'lay her down on a bed`,
    },
    'BREATH': {
        text: `Of course she is breathing! Don't you think I'd be more panicked if my only companion down here wasn't breathing? Well, I guess she's not my ONLY companion, because now you're helping me. Anyway, first thing first, should I move her to her bed? `,
        options: [
            {
                next: 'TRY_MOVE',
                triggers: ['YesIntent', 'Command_Move', 'NextIntent']
            },
        ],
        prompt: ` 'Good idea' or Don't move her that much`,
    },
    'TRY_MOVE': {   // ... After a moment of trying, hard work sound, failed
        text: `Alright, give me a sec while I try moving her ... she's still in her pressurized suit. It's really heavy, so I'll need to remove it first. What do you think? `,
        options: [
            {
                next: 'PRESSURIZED_SUIT',
                triggers: ['YesIntent', 'Command_Remove', 'NextIntent']
            },
        ],
        prompt: ` 'I agree'`,
    },
    'PRESSURIZED_SUIT': {
        text: `Oh no, something is stuck inside the zipper, Agh! I might have to make an incision in order to peel this off her. Is it worth it? `,
        options: [
            {
                next: 'INCISION',
                triggers: ['YesIntent', 'NextIntent']
            },
        ],
        prompt: ` 'go ahead' or 'stop!'`,
    },
    'INCISION': { // zipper sound, or cutting cloths sound, grossed out voice
        text: `Alright. I’m going in from the side...but it smells kind of...odd. Oh god, this is gross`,
        prompt: ` 'what does it look like' or 'what does it smell like'`,
    },
    'IT_LOOKS': {
        text: `It looks dark and moldy, Some of it's on her skin! This looks horrible. We need to do something about it`,
        prompt: ` 'we need to get it off her skin'`,
    },
    'IT_SMELLS': {
        text: `It smells like moldy death- like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
        prompt: ` 'we have to get rid of that'`,
    },
    'GUESS_PLANT': { // INFO
        text: `I think- shoot. I think she found exactly what we were trying to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of research on any of them given where they all grow.`,
        prompt: ` 'we should remove it at once'`,
    },
    'PEEL_OFF': {
        text: `You’re right. That must be it! I’m going to make an incision on the other side to peel off the entire front of her suit`,
        options: [
            {
                next: 'GROWTH_SKIN',
                triggers: ['anything']
            },
        ],
        prompt: ` 'good luck'`,
    },
    'RISK_LIFE': {
        text: `She’d be willing to risk her life for me, so I have to do the same. I’m going to pull the rest of her suit off by making an incision on the other side`,
        options: [
            {
                next: 'GROWTH_SKIN',
                triggers: ['anything']
            },
        ],
        prompt: ` 'good luck'`,
    },

    /* PART 3 */
    'GROWTH_SKIN': {
        text: `Finally got the front off. Man, she really looks and smells like death. I wonder how this growth got through her suit. Some of it's on her skin. We need to get it off.`,
        reprompt: ` What should I do? There could be some medical supplys laying around.`,
        prompt: ` 'Do you have a medical kit?'`,
        // options: [
        //     {
        //         next: 'GRAB_MEDICAL',
        //         triggers: ['Command_Item']
        //     },
        //     {
        //         next: 'MEDICAL_KIT',
        //         triggers: ['Command_Help']
        //     }
        // ],
    },
    'GRAB_MEDICAL': {
        text: `Yeah, let me grab it ... Okay, so we have the standard first aid stuff. `,
    },
    'BUT_MEDICAL': {
        text: `Hmmmmm, I'm not sure if I have that. But I just realized we have the standard first aid stuff. Let me grab it ... Okay, `,
    },
    'MEDICAL_KIT': {
        text: `Right, I almost forgot we have the standard first aid stuff. Let me grab it ... Okay, `,
    },
    'ANTISEPTIC_WIPES': {
        text: `I think cleaning her skin with antiseptic wipes would be a good move. There's also some bottles in here that look like they were thrown in by the Cap. The labels are hand written`,
        reprompt: ` What should I use? The antiseptic wipes, or the other bottles?`,
        prompt: ` Try the antiseptic.`,
    },
    'USE_ANTISEPTIC': {
        text: `So I got some surface grossness off, but the bacteria messed with her skin! The spots I cleaned are greenish and all bumpy. It's not something I can wipe off. Shoot, and she’s getting paler. We need to try something else. Ugh, I wish I had more medical knowledge`,
        reprompt: ` Maybe we should see the other bottles`,
        prompt: ` 'what are the other bottles?'`,
    },
    'OTHER_BOTTLES': { // ORIGINAL: "Wow. Doctor Lee always did- does- have a sense of humor."
        text: `Wow. Doctor Lee always did a sense of humor. One bottle says IN CASE OF BAD PLANTS, the other has some Chinese characters and a picture of a red X over plant images. One of these has to be an antidote, right? But these dumb labels. Why does she do this to me?`,
        prompt: ` 'What is in the plant image?'`,
    },
    'FIRST_PICTURE': {
        text: `The directions- Okay, wow there's directions but no proper label. Nice. `,
    },
    'DIRECTION_PICTURE': {
        text: `It says to use a syringe to inject the liquid into her bloodstream around the affected area starting with 3 milliliter. Increase dosage if needed. Should I try this one?`,
        prompt: ` 'Go ahead'`,
        first: `The directions- Okay, wow there's directions but no proper label. Nice. `,
        reprompt: `Should I use this one? Or do you want to see the other bottles?`,
    },
    'FIRST_BADPLANT': {
        text: `No directions- Wait, nevermind. There are some tiny text at the bottom. `,
    },
    'DIRECTION_BADPLANT': {
        text: `It says 'one shot. safe'. 'two shots, question mark'. She wrote an actual question mark in the directions.`,
        first: `No directions- Wait, nevermind. There are some tiny text at the bottom. `,
        reprompt: `Should I use this one? Or do you want to see the other bottles?`,
    },
    'START_BADPLANT': {
        text: `Okay, I will use one shot first. `,
    },
    'START_PICTURE': {
        text: `Alright then, I will start with 3 milliliter. `,
    },
    'CONDITION_WORSE': {
        text: `Oh, no. This stuff is making her worse! Her veins are popping out! The infected spots are so red! Hurry, what do I do`,
    },
    'WAIT': {
        text: `Wait, I think you’re right! Her veins are going back to normal. The redness is reducing all the bumps. It's working`,
    },

    'END_WAKE': { // ORIGINAL: Yeah, yeah. But listen, thank you.
        text: `Thank you. For everything. You've actually been pretty helpful- Oh my god! The captain! She's waking up`,
        options: [
            {
                next: 'END',
                triggers: 'anything'
            }
        ]
    },
    // 'DONT_SAY': {
    //     text: `Don't say that to me! She's going to live. Crap, crap, crap. What do I do!`,
    // }
    'REPEAT_GUESS': { // prob say, yeah you are right, cusins thus use this bottle
        text: `I think- shoot. I think she found exactly what we were tyring to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of reaserch on any of them given where they all grow.`,
    }
};

// Using the same code as in languageModel
const characters = [
  {
    "id": "Lee",
    "name": {
      "value": "Lee",
      "synonyms": [
        "Her",
        "She",
        "Sloane",
        "Doctor Lee",
        "Doctor",
        "Captain"
      ]
    }
  },
  {
    "id": "Jesse",
    "name": {
      "value": "Jesse",
      "synonyms": [
        "Jesse",
        "You",
        "Harper",
        "Jesse Harper"
      ]
    }
  }
];
const senses = [
  {
    "id": "smell",
    "name": {
      "value": "smell",
      "synonyms": []
    }
  },
  {
    "id": "look",
    "name": {
      "value": "look",
      "synonyms": [
        "see"
      ]
    }
  }
];
const items = [
  {
    "id": "sample",
    "name": {
      "value": "sample",
      "synonyms": [
        "research",
        "samples"
      ]
    }
  },
  {
    "id": "airLock",
    "name": {
      "value": "air lock",
      "synonyms": [
        "lock",
        "submarine",
        "sub"
      ]
    }
  },
  {
    "id": "firstAid",
    "name": {
      "value": "first aid",
      "synonyms": [
        "emergency kit",
        "health kit",
        "first aid kit",
        "medicine",
        "medical kit",
        "medical supply"
      ]
    }
  },
  {
    "id": "antiseptic",
    "name": {
      "value": "antiseptic",
      "synonyms": [
        "wipes",
        "antiseptic wipes"
      ]
    }
  },
  {
    "id": "selca",
    "name": {
      "value": "Selca",
      "synonyms": [
        "medicinal plant",
        "cousin"
      ]
    }
  },
  {
    "id": "plant",
    "name": {
      "value": "plant",
      "synonyms": [
        "moldy",
        "dark"
      ]
    }
  },
  {
    "id": "picture",
    "name": {
      "value": "picture",
      "synonyms": [
        "plant image",
        "red x",
        "plant picture",
        "plant pictures",
        "plant images"
      ]
    }
  },
  {
    "id": "bottles",
    "name": {
      "value": "bottles",
      "synonyms": [
        "other bottles"
      ]
    }
  },
  {
    "id": "badPlant",
    "name": {
      "value": "bad plant",
      "synonyms": [
        "bad plant bottle",
        "in case of bad plant"
      ]
    }
  }
];


var handlers = {
   'LaunchRequest': function() {
        if (Object.keys(this.attributes).length === 0) { // First time player
            this.attributes.game = {
                'state': game_state.START,
                'progressIndex': game_progress.PROLOGUE,
                // 'progress': {},
                'slot': '',
                'visited' : ['FIRST'],
                'currentScript' : ['FIRST'],
                'currentIntent' : ''
            };
            if (isDebug) {
                this.attributes.game = {
                    'state': game_state.GAME,
                    'progressIndex': game_progress.PART_1,
                    'slot': '',
                    'visited' : ['KIND_OF_ILLEGAL'],
                    'currentScript' : ['KIND_OF_ILLEGAL'],
                    'currentIntent' : ''
                }
            }
        } else {
            this.attributes.game.state = game_state.RETURNING;
        }
        this.emit('GenerateDialog');
   },

   // Calls a state machine that handles the decisions made by the player
   'handleIntent': function() {
        console.log('Handling: ' + this.attributes.game.currentIntent);
        this.attributes.game = updateProgress(this.attributes.game);

        // Add the current script to the visited list
        // this.attributes.game.currentScript.forEach( (script) => {
        //     if (this.attributes.game.visited.indexOf(script) === -1) {
        //         this.attributes.game.visited.push(script);
        //     }
        // }, this);

        this.emit('GenerateDialog');
   },

    // Get the next script and generate the response
    'GenerateDialog': function() {
        var speechOutput = '';
        let num_scripts = this.attributes.game.currentScript.length;
        let lastScript = this.attributes.game.currentScript[num_scripts - 1];

        if (this.attributes.game.state == game_state.HELP) {
            let index = Math.floor(Math.random() * belowScript.HELP.text.length);
            speechOutput += belowScript.HELP.text[index];
            speechOutput += belowScript[lastScript].prompt;
            this.attributes.game.state = game_state.GAME;
            this.response.speak(speechOutput).listen();
            this.emit(':responseReady');
            return;
        }

        console.log('GenerateDialog: (' + this.attributes.game.state + ') ' + this.attributes.game.currentScript);
        if (this.attributes.game.state != game_state.GAME) {
            speechOutput += belowScript[this.attributes.game.state].text;
        }

        // speechOutput += belowScript[lastScript].text;
        for (var i = 0; i < num_scripts; i++) {
            // console.log('GenerateDialog - i=' + i + ' : ' + this.attributes.game.currentScript[i]);
            let currScript = this.attributes.game.currentScript[i];
            if (this.attributes.game.visited.indexOf(currScript) === -1) {
                speechOutput += (belowScript[currScript].first) ? belowScript[currScript].first : '';

                // Add the current script to the visited list
                this.attributes.game.visited.push(currScript);
            }
            // if (belowScript[currScript].first && this.attributes.game.visited.indexOf(currScript) === -1) {
            //     speechOutput += belowScript[currScript].first;
            // }
            speechOutput = speechOutput + belowScript[currScript].text;
            // this.attributes.game.visited.push(currScript);
        }

        var reprompt = '';
        if (belowScript[lastScript].reprompt) {
            reprompt = belowScript[lastScript].reprompt;
            if (this.attributes.game.state == game_state.UNHANDLED) {
                speechOutput += belowScript[lastScript].reprompt;
            }
        } else {
            reprompt = belowScript[game_state.IGNORE].text + belowScript[lastScript].text;
        }

        console.log('GenerateDialog - Final output: ' + speechOutput);
        this.attributes.game.state = game_state.GAME;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },

    'AMAZON.StartOverIntent': function() {
        this.attributes.game = {
            'state': game_state.GAME,
            'progressIndex': game_progress.PROLOGUE,
            // 'progress': {},
            'currentScript' : ['FIRST'],
            'currentIntent' : '',
            'visited' : ['FIRST']
        };
        this.emit('GenerateDialog');
    },

    'AMAZON.IgnoreAction': function() {
        this.attributes.game.state = game_state.IGNORE;
        this.emit('GenerateDialog');
        console.log('User ignored');
    },

    'AMAZON.RepeatIntent': function() {
        this.attributes.game.state = game_state.REPEAT;
        this.emit('GenerateDialog');
        console.log('User asks to repeat');
    },

    'AMAZON.HelpIntent': function() {
        this.attributes.game.state = game_state.HELP;
        this.emit('GenerateDialog');
        // this.attributes.game.currentIntent = 'HelpIntent';
        // this.emit('handleIntent');
        console.log('AMAZON.HelpIntent');
    },

    'AMAZON.NextIntent': function() {
        this.attributes.game.currentIntent = 'NextIntent';
        this.emit('handleIntent');
    },

    // Unhandled only works when the dialog can be forwarded with 'anything'
    'Unhandled': function() {
        console.log('Unhandled');
        this.attributes.game.currentIntent = 'UnhandledIntent';
        this.emit('handleIntent');
    },

    // // Save state
    // 'SessionEndedRequest': function() {
    //     console.log('session ended!');
    //     this.emit(':saveState', true);
    // },

    /* CUSTOM INTENTS */
    'YesIntent': function () {
        this.attributes.game.currentIntent = 'YesIntent';
        this.emit('handleIntent');
    },

    'NoIntent': function () {
        this.attributes.game.currentIntent = 'NoIntent';
        this.emit('handleIntent');
    },

    'WaitIntent': function () {
        this.attributes.game.currentIntent = 'WaitIntent';
        this.emit('handleIntent');
    },

    'AskSituation': function () {
        this.attributes.game.currentIntent = 'AskSituation';
        this.attributes.game.slot = this.event.request.intent.slots.person.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.attributes.game.slot);
    },

    'AskWho': function () {
        this.attributes.game.currentIntent = 'AskWho';
        this.emit('handleIntent');
    },

    'AskWhat': function() {
        this.attributes.game.currentIntent = 'AskWhat';
        if (this.event.request.intent.slots.item.value)
            this.attributes.game.slot = this.event.request.intent.slots.item.value;
        else
            this.attributes.game.slot = this.event.request.intent.slots.sense.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.attributes.game.slot);
    },

    'AskWhere': function() {
        this.attributes.game.currentIntent = 'AskWhere';
        this.attributes.game.slot = this.event.request.intent.slots.person.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.attributes.game.slot);
    } ,

    'Special_Illegal': function() {
        this.attributes.game.currentIntent = 'Special_Illegal';
        this.emit('handleIntent');
    },

    'Special_Help': function() {
        this.attributes.game.currentIntent = 'Special_Help';
        this.emit('handleIntent');
    },

    'Special_Breath': function() {
        this.attributes.game.currentIntent = 'Special_Breath';
        this.emit('handleIntent');
    },

    'Command_Remove': function() {
        this.attributes.game.currentIntent = 'Command_Remove';
        this.emit('handleIntent');
    },

    'Command_Move': function() {
        this.attributes.game.currentIntent = 'Command_Move';
        this.emit('handleIntent');
    },

    'Command_Item': function() {
        this.attributes.game.slot = this.event.request.intent.slots.item.value;
        this.attributes.game.currentIntent = 'Command_Item';
        this.emit('handleIntent');
    },
}

// Record player's new findings and update progress
var updateProgress = function(game_obj) {
    switch (game_obj.progressIndex) {
        case game_progress.PROLOGUE:
            return prologue(game_obj);
        case game_progress.PART_1:
            return part1(game_obj);
        case game_progress.PART_2:
            return part2(game_obj);
        case game_progress.PART_3:
            return part3(game_obj);
        default:
            return game_obj;
    }
}

var prologue = function(game) {
    game = nextDialog(game);

    // Enter part 1
    if (game.currentScript == 'THANK_GOD') {
        game.progressIndex = game_progress.PART_1;
        // Setting up for part 1
        // game.progress = {
        //     // 'slot': '',
        //     'who': false,
        //     'situation': false,
        //     'samples': false,
        //     'submarine': false,
        //     'exploration': false,
        //     'research': false,
        //     'askedWhere': false,
        // };
    }

    return game;
}

var part1 = function(game) {
    console.log('========== PART 1 ========== ');
    let lastScript = game.currentScript[game.currentScript.length - 1];
    let slot = game.slot;
    if (lastScript == 'KIND_OF_ILLEGAL') { // Last dialog: exploration
        let slot_result = findSlotID(slot, characters);
        switch(game.currentIntent) {
            case 'AskWhere':
                if (slot_result == 'Lee') {
                    game.currentScript = ['HER_SITUATION'];
                }
                break;
            case 'AskSituation':
                console.log('PART 1 - KIND_OF_ILLEGAL: slot_result = ' + slot_result);
                if (slot_result == 'Lee') {
                    game.currentScript = ['HER_SITUATION'];
                } else {
                    game.currentScript = ['THE_ILLEGALITY'];
                }
                break;
            case 'Special_Illegal':
                game.currentScript = ['THE_ILLEGALITY'];
                break;
            case 'Special_Help':
                // Enter part 2
                game.currentScript = ['HER_SITUATION'];
                break;
            default:
                game.state = game_state.UNHANDLED;
                break;
        }
    } else if (belowScript[lastScript].options) { // Has options
        game = nextDialog(game);
    } else { // No options, proceed dialogs by asking questions
        switch (game.currentIntent) {
            case 'AskWho':
                // game.progress.who = true;
                game.currentScript = ['SELF_INTRODUCTION'];
                break;
            case 'AskSituation':
                console.log('PART 1 - Asking about situation');
                // game.progress.situation = true;
                game.currentScript = ['UNCONSCIOUS'];
                break;
            case 'AskWhat':
                console.log('PART 1 - Asking about : ' + slot);
                let slot_result = findSlotID(slot, items);
                if (slot_result == 'airLock') {
                    // game.progress.submarine = true;
                    game.currentScript = ['EXPLAIN_SUBMARINE'];
                } else if (slot_result == 'sample') {
                    // game.progress.samples = true;
                    game.currentScript = ['EXPLAIN_SAMPLE'];
                } else {
                    game.state = game_state.UNHANDLED;
                }
                break;
            case 'AskWhere':
                if (game.visited.indexOf('EXPLAIN_SUBMARINE') === -1) { // 1st time asking where
                    // game.progress.submarine = true;
                    game.currentScript = ['EXPLAIN_SUBMARINE'];
                    // game.progress.askedWhere = true;
                } else {                         // 2nd time asking where
                    if (game.visited.indexOf('EXPLORATION') === -1) {
                        game.currentScript = ['NEED_INTRODUCTION', 'EXPLORATION']
                        // game.progress.who = true;
                    } else {
                        game.currentScript = ['EXPLORATION'];
                    }
                    // game.progress.exploration = true;
                }
                break;
            case 'Special_Help':
                // Enter part 2
                game.currentScript = ['HER_SITUATION'];
                break;
            default:
                game.state = game_state.UNHANDLED;
                break;
        }
    }

    // Enter part 2
    let newScript = game.currentScript[game.currentScript.length - 1];
    if (newScript == 'HER_SITUATION' || newScript == 'CONTINUE_SITUATION') {
        game.progressIndex = game_progress.PART_2;
        // game.progress['redness'] = 0;
    }
    return game;
}

var part2 = function(game) {
    console.log('========== PART 2 ========== ');
    let lastScript = game.currentScript[game.currentScript.length - 1];
    let currIntent = game.currentIntent;
    if (currIntent == 'Special_Breath' || (currIntent == 'AskSituation' && findSlotID(game.slot, characters) == 'Lee')) {
        console.log('Part 2 - visited breath yes? ' + game.visited.indexOf('BREATH'));
        if (game.visited.indexOf('BREATH') === -1) {
            game.currentScript = ['BREATH'];
            // game.progress.askedBreath = true;
            return game;
        } else {
            if (currIntent != 'AskSituation') {
            // switch (game.progress['redness']) {
            //     case 0:
            //         game.currentScript.push('FACE_NORMAL');
            //         return game;
            //     case 1:
            //         game.currentScript.push('FACE_RED');
            //         return game;
            //     case 2:
            //         game.currentScript.push('FACE_PURPLE');
            //         return game;
            //     default:
            //         game.currentScript.push('OH_NO');
            // }
            // return game;
            }
        }
    }

    let slot_result = findSlotID(game.slot, senses);
    switch (lastScript) {
        case 'IT_LOOKS':
        case 'IT_SMELLS':
            if (currIntent == 'AskWhat' && slot_result != 'smell' && slot_result != 'look') {
                game.currentScript = ['GUESS_PLANT'];
                // game.progress.guessPlant = true;
                return game;
            }
        case 'INCISION':
            if (currIntent == 'AskWhat' && slot_result == 'smell') {
                game.currentScript = ['IT_SMELLS'];
            } else if ((currIntent == 'AskWhat' && slot_result == 'look') || currIntent == 'AskSituation') {
                game.currentScript = ['IT_LOOKS'];
            } else if (currIntent == 'Command_Remove') {
                game.currentScript = ['PEEL_OFF'];
            } else {
                game.state = game_state.UNHANDLED;
            }
            return game;
        default:
            break;
        // case 'CONTINUE_SITUATION':
        // case 'HER_SITUATION':
    }

    game = nextDialog(game);

    let newScript = game.currentScript[game.currentScript.length - 1];
    if (newScript.slice(0, 4) == 'END') {
        game.progressIndex = game_progress.END;
    } else if (newScript == 'GROWTH_SKIN') {
        game.progressIndex = game_progress.PART_3;
        // game.progress.firstPicture = true; // First time triggering this dialogue?
        // game.progress.firstBadPlant = true; // First time triggering this dialogue?
    }

    return game;
}

var part3 = function(game) {
    console.log('========== PART 3 ========== ');
    let lastScript = game.currentScript[game.currentScript.length - 1];
    let slot_item = findSlotID(game.slot, items);

    if (game.currentIntent == 'AskWhat' && slot_item == 'plant') {
        game.currentScript = [(game.visited.indexOf('GUESS_PLANT') === -1) ? 'REPEAT_GUESS' : 'GUESS_PLANT'];
    }

    switch (lastScript) {
        case 'GROWTH_SKIN':
            if (game.currentIntent == 'Command_Item' || game.currentIntent == 'AskWhat') {
                game.currentScript = [(slot_item == 'firstAid') ? 'GRAB_MEDICAL' : 'BUT_MEDICAL', 'ANTISEPTIC_WIPES'];
                return game;
            } else if (game.currentIntent == 'Command_Help') {
                game.currentScript = ['MEDICAL_KIT', 'ANTISEPTIC_WIPES'];
                return game;
            }
            break;
        case 'ANTISEPTIC_WIPES':
            if (game.currentIntent == 'Command_Item' || game.currentIntent == 'AskWhat') {
                game.currentScript = [(slot_item == 'antiseptic') ? 'USE_ANTISEPTIC' : 'OTHER_BOTTLES'];
                return game;
            }
            break;
        case 'USE_ANTISEPTIC':
            if (slot_item == 'bottles') {
                game.currentScript = ['OTHER_BOTTLES'];
                return game;
            }
            break;
        case 'DIRECTION_BADPLANT':
        case 'DIRECTION_PICTURE':
            let bottle_name = lastScript.slice(10);
            console.log('Bottle name: ' + bottle_name);
            if (game.currentIntent == 'YesIntent' || game.currentIntent == 'NextIntent') {
                game.currentScript = [ 'START_' + bottle_name, 'CONDITION_WORSE'];
                return game;
            }
        case 'OTHER_BOTTLES':
            if (slot_item == 'picture') {
                game.currentScript = ['DIRECTION_PICTURE'];
                // if (game.progress.firstPicture) {
                //     game.currentScript = ['FIRST_PICTURE', 'DIRECTION_PICTURE'];
                //     game.progress.firstPicture = false;
                // } else {
                //     game.currentScript = ['DIRECTION_PICTURE'];
                // }
                return game;
            } else if (slot_item == 'badPlant') {
                game.currentScript = ['DIRECTION_BADPLANT'];
                // if (game.progress.firstBadPlant) {
                //     game.currentScript = ['FIRST_BADPLANT', 'DIRECTION_BADPLANT'];
                //     game.progress.firstBadPlant = false;
                // } else {
                //     game.currentScript = ['DIRECTION_BADPLANT'];
                // }
                return game;
            }
            break;
        case 'CONDITION_WORSE':
            if (game.currentIntent == 'WaitIntent') {
                game.currentScript = ['WAIT'];
            }
            break;
        default:
            break;
    }

    game.state = game_state.UNHANDLED;
    return game;
}

// Find the next dialog that will trigger by the current intent
var nextDialog = function(game) {
    let lastScript = game.currentScript[game.currentScript.length - 1];
    let intentName = game.currentIntent;
    console.log('Checking tigger for: ' + intentName);
    var nextIndex;
    belowScript[lastScript].options.forEach( function(option) {
        option.triggers.forEach( function(trigger) {
            if (trigger === 'anything' || intentName == trigger) {
                nextIndex = option.next;
            }
        })
    });
    if (nextIndex === undefined) { //
        game.state = game_state.UNHANDLED; //Did not trigger the next dialog
    } else {
        game.currentScript = [nextIndex];
        console.log('nextDialog - next script : ' + nextIndex);
    }

    return game;
}

var setUnhandled = function(game_obj) {
    game_obj.state = game_state.UNHANDLED;
    console.log('Failed to trigger');
    return game_obj;
}

var findSlotID = function(input_slot, slots) {
    console.log('PARSING SLOT - input: ' + input_slot);
    if (input_slot) {
        for (var i = 0; i < slots.length; i++) {
            // console.log('PARSING SLOT - check name: ' + slots[i].name.value);
            if (input_slot.toUpperCase() === slots[i].name.value.toUpperCase()) {
                // console.log('PARSING SLOT - result: ' + slots[i].id);
                return slots[i].id;
            }
            for (var j = 0; j < slots[i].name.synonyms.length; j++) {
                if (input_slot.toUpperCase() === slots[i].name.synonyms[j].toUpperCase()) {
                    // console.log('PARSING SLOT - result: ' + slots[i].id);
                    return slots[i].id;
                }
            }
        }
    }
    console.log('PARSING SLOT - result: not found');
    return;
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    // alexa.dynamoDBTableName = 'BelowGame';
    alexa.registerHandlers(handlers);
    alexa.execute();
};
