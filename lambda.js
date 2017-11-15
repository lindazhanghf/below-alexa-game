"use strict"; /* Documentation: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs */

var Alexa = require("alexa-sdk");

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
        text: `Welcome to below game, you can pause this game anytime by saying exit and your progress will be saved. `
    },
    'RETURNING': {
        text: `Welcome back to below game, you can restart the game by saying start over. `
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
        text: `You have finished the first chapter of the Below game. The second chapter is still under development. You can start over and uncover more stories below the surface.`
    },
    'HELP': {
        text: [
            `You can ask questions like ... `,
            `Try say something like ... `,
            `Maybe say ... `
        ]
    },
    'FIRST': {
        text: `You're alone, manning your ship on a voyage through the Philippine Sea when you hear your radio: Hello? `,
        options: [
            {
                next: 'HELLO',
                triggers: ['anything']
            }
        ]
    },
    'HELLO': {
        text: `Hello? Can anyone hear me? Please... Anyone.`,
        options: [
            {
                next: 'THANK_GOD',
                triggers: ['anything']
            }
        ]
    },
    'THANK_GOD': {
        text: `Oh my god. Yes! Thank god. I was about to give up. It was terrible...`, //Or "This terrible situation..."
        // options: [
        //     {
        //         next: 'UNCONSCIOUS',
        //         triggers: ['AskSituation'],
        //     },
        //     {
        //         next: 'SELF_INTRODUCTION',
        //         triggers: ['AskWho'],

        //     }
        // ],
        prompt: ` 'what is happening', or 'who are you'`
    },
    'SELF_INTRODUCTION': {
        text: `This is Jesse Harper. I'm a bioengineer currently training under Doctor Sloane Lee. But she's not doing very well. I'm not sure what's wrong with her`,
    },
    'UNCONSCIOUS': {
        text: `I'm not entirely sure. My captain she ... she's unconscious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock`,
    },
    'EXPLAIN_SUBMARINE': {
        text: `We're in a submarine, and our entire expedition has been underwater.`
    },
    'EXPLAIN_SAMPLE': {
        text: `For the past two weeks, we've been doing research and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples, but something went wrong.`
    },
    'NEED_INTRODUCTION': { // When Jesse forgot to introduce himself at first
        text: `Ah right. Ok, I need to explain myself a little better. Sorry. This is Jesse Harper. I'm a bioengineer and currently Doctor Sloane Lee's apprentice, but, obviously, she's not doing very well. Also ...`,
        options: [
            {
                next: 'EXPLORATION',
                triggers: ['anything']
            }
        ]
    },
    'EXPLORATION': {
        text: `Actually, We are exploring The Mariana Trench... Our project is pretty huge and also, kind of, well...`,
        options: [
            {
                next: 'KIND_OF_ILLEGAL',
                triggers: ['anything']
            }
        ]
    },
    'KIND_OF_ILLEGAL': {
        text: `Kind of illegal. But listen, you can ask me more questions later. Right now, I'm worried about Captain Lee`,
    },
    'THE_ILLEGALITY': {
        text: `The illegality makes our work seem worse than it actually is... Basically, exploration of this area of the trench is restricted. Only the government and the very specific researchers they select have access to this area`,
        options: [
            {
                next: 'STOLE',
                triggers: ['anything']
            }
        ]
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
                triggers: ['AskWhat']
            }
        ]
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
        ]
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
        ]
    },
    'EXPLAIN_RESEARCH': {
        text: `I know! I know. But listen, someone's dig around in this place. What are they keeping from us down here? The rest of the Mariana's been relatively easy to get a permit for for decades. Especially for scientists with meaningful research like Doctor Lee! Once the Captain and I started our studies and realized that the Selcal Lexorium potentially originated from this area... Well, she's not really the type to let the law get in the way of scientific progress. Our research is for the greater good! We could help thousands.`,
        options: [
            {
                next: 'CONTINUE_SITUATION',
                triggers: ['anything']
            }
        ]
    },
    'EXPLAIN_HER': {
        text: `Doctor Sloane Lee is a captain. And doctor. Both. She's very intelligent and diversely qualified.`,
        // options: [
        //     {
        //         next: 'HER_SITUATION',
        //         triggers: ['anything']
        //     }
        // ]
    },
    'CONTINUE_SITUATION': {
        text: `And now we've been talking too long. I should get back to her. She's still on the ground right now. I dragged her out of the airlock and removed her helmet. Once she was inside, I tried calling for help. We're lucky you responded`,
        options: [
            {
                next: 'HER_SITUATION',
                triggers: ['anything']
            }
        ]
    },
    'HER_SITUATION': {
        text: `She's still on the ground right now. I dragged her out of the airlock and removed her helmet. Once she was inside, I tried calling for help. We're lucky you responded`,
    },

    // 'I_CAN': {
    //     text: `I can, but she's still in her pressurized suit. It's really heavy, so I'll need to remove it first`,
    // },
    // 'OF_COURSE': {
    //     text: `Of course she is! Don't you think I'd be more panicked if my only companion down here wasn't breathing? Well, I guess she's not my ONLY companion, because now you're helping me`,
    // },
    // 'WELL_THIS': {
    //     text: `Well this situation isn't particularly calming`,
    // },
    // 'ALRIGHT': {
    //     text: `Alright, I think I'm going to try to get her out of the suit. She should be moved to the bed, but this suit's way to huge to lift her in.`,
    // },
    // 'LET_ME': {
    //     text: `Let me see what I can do`,
    // },
    // 'I_AM': {
    //     text: `I'm not too sure... I think there might be something wrong with it. It's definitely not helping her. Trust me on this`,
    // },
    // 'THE_SUIT’S': {
    //     text: `The suit’s so heavy! Agh! I might have to make an incision in order to peel this off her. Is it worth it`,
    // },
    // 'ALRIGHT.': {
    //     text: `Alright. I’m going in from the side...but it smells kind of...odd. I think- shoot. I think she found exactly what we were tyring to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of reaserch on any of them given where they all grow. Oh god, this is gross`,
    // },
    // 'IT_LOOKS': {
    //     text: `It looks dark and moldy, like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
    // },
    // 'IT_SMELLS': {
    //     text: `It smells like moldy death- like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
    // },
    // 'OH_GOD': {
    //     text: `Oh god, you’re right. That must be it! I’m going to make an incision on the other side to peel off the entire front of her suit`,
    // },
    // 'SHED_BE': {
    //     text: `She’d be willing to risk her life for me, so I have to do the same. I’m going to pull the rest of her suit off by making an incision on the other side`,
    // },
    // 'FINALLY GOT': {
    //     text: `Finally got the front off. Man, she really looks and smells like death. I wonder how this growth got through her suit. Some of it's on her skin`,
    // },
    // 'YEAH_LET': {
    //     text: `Yeah, let me grab it`,
    // },
    // 'OKAY': {
    //     text: `Okay, so we have the standard first aid stuff. I think cleaning her skin with antiseptic wipes would be a good move. There's also some bottles in here that look like they were thrown in by the Cap. The labels are hand written`,
    // },
    // 'SO_I': {
    //     text: `So I got some surface grossness off, but the bacteria messed with her skin! The spots I cleaned are greenish and all bumpy. It's not something I can wipe off. Shit, and she’s getting paler. We need to try something else. Ugh, I wish I had more medical knowledge`,
    // },
    // 'WOW_DOCTOR': {
    //     text: `Wow. Doctor Lee always did- does- have a sense of humor. One bottle says IN CASE OF BAD PLANTS the other has some Chinese characters and a picture of a red X over plant images. One of these has to be an antidote, right? But these dumb labels. Why does she do this to me`,
    // },
    // 'THE_DIRECTIONS': {
    //     text: `The directions- Okay, wow there's directions but no proper label. Nice. It says to use a syringe to inject the liquid into her bloodstream around the affected area starting with 3mL. Increase dosage if needed? She wrote an acutal question mark in the directions`,
    // },
    // 'OH_MAN': {
    //     text: `Oh man. If she dies, it's on her. But also, I really, really hope she lives. Here goes nothing`,
    // },
    // 'OH_SHIT': {
    //     text: `Oh, shit. This stuff is making her worse! Her veins are popping out! The infected spots are so red! Hurry, what do I do`,
    // },
    // 'WAIT': {
    //     text: `Wait, I think you’re right! The redness is reducing all the bumps. It's working`,
    // },
    // 'OH_PLEASE': {
    //     text: `Oh, please. I did all the work. You're just on the other side of the radio`,
    // },
    // 'YEAH_YEAH': {
    //     text: `Yeah, yeah. But listen, thank you. For everything. You've actually been pretty helpf- Oh my god! The captain! She's waking up`,
    // },
    // 'WAIT_HER': {
    //     text: `Wait! Her veins are going back to normal. The redness is reducing all the bumps! It's working`,
    // },
    // 'DONT_SAY': {
    //     text: `Don't say that to me! She's going to live. Crap, crap, crap. What do I do!`,
    // }
};

var handlers = {
   'LaunchRequest': function() {
        if (Object.keys(this.attributes).length === 0) { // First time player
            this.attributes.game = {
                'state': game_state.START,
                'progressIndex': game_progress.PROLOGUE,
                'progress': {},
                'currentIndex' : 'FIRST',
                'currentIntent' : ''
           };
        } else {
            this.attributes.game.state = game_state.RETURNING;
        }
        this.emit('GenerateDialog');
   },

   // Calls a state machine that handles the decisions made by the player
   'handleIntent': function() {
        console.log('Handling: ' + this.attributes.game.currentIntent);
        // var currIntent = this.attributes.game.currentIntent;
        this.attributes.game = updateProgress(this.attributes.game);
        this.emit('GenerateDialog');
   },

    // Get the next script and generate the response
    'GenerateDialog': function() {
        var speechOutput = '';
        var currentIndex = this.attributes.game.currentIndex;

        if (this.attributes.game.state != game_state.GAME) {
            console.log('Before GenerateDialog: ' + this.attributes.game.state + '. Then ' + currentIndex);
            speechOutput += belowScript[this.attributes.game.state].text;
            this.attributes.game.state = game_state.GAME;
        }

        speechOutput += belowScript[currentIndex].text;
        this.response.speak(speechOutput).listen();
        this.emit(':responseReady');
    },

    'IgnoreAction': function() {
        this.attributes.game.state = game_state.IGNORE;
        this.emit('GenerateDialog');
        console.log('User ignored');
    },

    'RepeatIntent': function() {
        this.attributes.game.state = game_state.REPEAT;
        this.emit('GenerateDialog');
        console.log('User asks to repeat');
    },

    'NextIntent': function() {
        this.attributes.game.currentIntent = 'NextIntent';
        this.emit('handleIntent');
    },

    'HelpIntent': function() {
        this.attributes.game.state = game_state.UNHANDLED; // TODO Change to prompt user the suggestions
        this.emit('GenerateDialog');
        console.log('HelpIntent');
    },

    // Unhandled only works when the dialog can be forwarded with 'anything'
    'Unhandled': function() {
        this.attributes.game.currentIntent = 'UnhandledIntent';
        this.emit('handleIntent');
        console.log('Unhandled');
    },

    /* CUSTOM INTENTS */
    'YesIntent': function () {
        this.attributes.game.currentIntent = 'YesIntent';
        this.emit('handleIntent');
    },

    'NoIntent': function () {
        this.attributes.game.currentIntent = 'NoIntent';
        this.emit('handleIntent');
    },

    'HelloIntent': function () {
        this.attributes.game.currentIntent = 'HelloIntent';
        this.emit('handleIntent');
    },

    'AskSituation': function () {
        this.attributes.game.currentIntent = 'AskSituation';
        this.attributes.game.progress.slot = this.event.request.intent.slots.she.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.event.request.intent.slots.she.value);
    },

    'AskWho': function () {
        this.attributes.game.currentIntent = 'AskWho';
        this.emit('handleIntent');
    },

    'AskWhat': function() {
        this.attributes.game.currentIntent = 'AskWhat';
        this.attributes.game.progress.slot = this.event.request.intent.slots.item.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.event.request.intent.slots.item.value);
    },

    'AskWhere': function() {
        this.attributes.game.currentIntent = 'AskWhere';
        this.attributes.game.progress.slot = this.event.request.intent.slots.person.value;
        this.emit('handleIntent');
        console.log('Asking about: ' + this.event.request.intent.slots.person.value);
    } ,

    'Special_Illegal': function() {
        this.attributes.game.currentIntent = 'Special_Illegal';
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
    var nextIndex = checkTrigger(game.currentIntent, game.currentIndex);

    if (nextIndex === undefined) { // Did not trigger the next dialog
        this.attributes.game.state = game_state.UNHANDLED;
        console.log('Failed to trigger');
    } else {
        game.currentIndex = nextIndex;
        console.log('Prologue - next script : ' + nextIndex);
    }

    // Enter part 1
    if (nextIndex == 'THANK_GOD') {
        game.progressIndex = game_progress.PART_1;
        // Setting up for part 1
        game.progress = {
            'slot': '',
            'who': false,
            'situation': false,
            'samples': false,
            'airLock': false,
            'exploration': false,
            'research': false, // Optional to enter part 2
        };
    }

    return game;
}

var part1 = function(game) {
    let slot = game.progress.slot;
    if (game.currentIndex == 'KIND_OF_ILLEGAL') { // Last dialog: exploration
        // let slot_result = checkCharacterSlot(slot);
        switch(game.currentIntent) {
            case 'AskWhere':
                if (slot == 'she') {
                    game.currentIndex = 'HER_SITUATION';
                }
                break;
            case 'AskSituation':
                console.log('PART 1 - KIND_OF_ILLEGAL: slot = ' + slot);
                if (slot == 'she') {
                    game.currentIndex = 'HER_SITUATION';
                } else {
                    game.currentIndex = 'THE_ILLEGALITY';
                }
                break;
            case 'Special_Illegal':
                game.currentIndex = 'THE_ILLEGALITY';
                break;
            default:
                game.state = game_state.UNHANDLED;
                // game = setUnhandled(game);
                break;
        }
    } else if (belowScript[game.currentIndex].options) { // Has options
        var nextIndex = checkTrigger(game.currentIntent, game.currentIndex);

        if (nextIndex === undefined) { //
            game.state = game_state.UNHANDLED; //Did not trigger the next dialog
            // game = setUnhandled(game);
        } else {
            game.currentIndex = nextIndex;
            console.log('Part 1 - next script : ' + nextIndex);
        }

    } else { // No options, proceed dialogs by asking questions
        switch (game.currentIntent) {
            case 'AskWho':
                game.progress.who = true;
                game.currentIndex = 'SELF_INTRODUCTION';
                break;
            case 'AskSituation':
                console.log('PART 1 - Asking about situation');
                game.progress.situation = true;
                game.currentIndex = 'UNCONSCIOUS';
                break;
            case 'AskWhat':
                console.log('PART 1 - Asking about : ' + slot);
                let slot_result = checkItemSlot(slot);
                if (slot_result == 'airLock') {
                    game.progress.airLock = true;
                    game.currentIndex = 'EXPLAIN_SUBMARINE';
                } else if (slot_result == 'sample') {
                    game.progress.samples = true;
                    game.currentIndex = 'EXPLAIN_SAMPLE';
                } else {
                    game.state = game_state.UNHANDLED;
                    // game = setUnhandled(game);
                }
                // game.progress.slot = '';
                break;
            case 'AskWhere':
                let p = game.progress;
                if (p.situation && p.airLock && p.samples) {
                    if (!p.who) {
                        game.progress.who = true;
                        game.currentIndex = 'NEED_INTRODUCTION';
                        break;
                    }
                    game.progress.exploration = true;
                    game.currentIndex = 'EXPLORATION';
                } else {
                    game.state = game_state.UNHANDLED;
                    // game = setUnhandled(game);
                }
                break;
            default:
                game.state = game_state.UNHANDLED;
                break;
        }
    }
    game.progress.slot = ''; // Clear out slot value

    // Enter part 2
    if (game.currentIndex == 'HER_SITUATION') {
        game.progressIndex = game_progress.PART_2;
        var askedResearch = game.progress.research;
        game.progress = {
            'slot': '',
            'research': askedResearch,
        }
    }

    return game;
}

var part2 = function(game) {

    return game;
}

var part3 = function(game) {

    return game;
}

// Find the next dialog that will trigger by the intent
var checkTrigger = function(intentName, currIndex) {
    console.log('Checking tigger for: ' + intentName);
    var nextIndex;
    belowScript[currIndex].options.forEach( function(option) {
        option.triggers.forEach( function(trigger) {
            if (trigger === 'anything' || intentName == trigger) {
                nextIndex = option.next;
            }
        })
    });

    return nextIndex;
}

var setUnhandled = function(game_obj) {
    game_obj.state = game_state.UNHANDLED;
    console.log('Failed to trigger');
    return game_obj;
}

var checkCharacterSlot = function(input_slot) {
    const character = {
        "name": "Character",
        "values": [
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
        ]
      };
    let slotID = findSlotID(input_slot, character);
    console.log('PARSING SLOT - result: ' + slotID);
    return slotID;
}

var checkItemSlot = function(input_slot) {
    // const item = {
    //     "name": "Item",
    //     "values": [
    //       {
    //         "id": "sample",
    //         "name": {
    //           "value": "sample",
    //           "synonyms": [
    //             "research"
    //           ]
    //         }
    //       },
    //       {
    //         "id": "airLock",
    //         "name": {
    //           "value": "air lock",
    //           "synonyms": [
    //             "lock",
    //             "submarine",
    //             "sub"
    //           ]
    //         }
    //       },
    //       {
    //         "id": "firstAid",
    //         "name": {
    //           "value": "first aid",
    //           "synonyms": [
    //             "emergency kit",
    //             "health kit",
    //             "medical kit",
    //             "first aid kit"
    //           ]
    //         }
    //       }
    //     ]
    //   };   
    // let slotID = findSlotID(input_slot, item);
    // console.log('PARSING SLOT - result: ' + slotID);
    // return slotID;
    if (input_slot == 'air lock' || input_slot == 'submarine' || input_slot == 'lock')
        return 'airLock';
    else if (input_slot == 'sample' || input_slot == 'samples' || input_slot == 'research')
        return 'sample';
    return;
}

var findSlotID = function(input_slot, slot_obj) {
    console.log('PARSING SLOT - ' + input_slot);
    slot_obj.values.forEach( function(slot_type) {
        // console.log('slot_type.id = ' + slot_type.id);
        if (input_slot.toUpperCase() === slot_type.name.value.toUpperCase()) return slot_type.id;
        slot_type.name.synonyms.forEach( (slot) => {
            if (input_slot == slot) return slot_type.id;
        })
    });
    return;
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
