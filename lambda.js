"use strict"; /* Documentation: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs */

var Alexa = require("alexa-sdk");

const game_state = {
    START: 'START',
    RETURNING: 'RETURNING',
    GAME: 'GAME',
    HELP: 'HELP',
    IGNORE: 'IGNORE',
    REPEAT: 'REPEAT'
};

const game_progress = {
    PROLOGUE: 'PROLOGUE',
    PART_1: 'PART_1',
    PART_2: 'PART_2',
    PART_3: 'PART_3',
    EPILOGUE: 'EPILOGUE'
};

var belowScript = {
    'START': {
        text: `Welcome to below game, you can pause this game anytime by saying exit and your progress will be saved. `
    },
    'RETURNING': {
        text: `Welcome back to below game, you can restart the game by saying start over. `
    },
    'HELP': {
        text: `I am not sure what you mean. Let me repeat myself here. `
    },
    'IGNORE': {
        text: `I didn't catch that. `
    },
    'REPEAT': {
        text: `Sorry I wasn't very clear. `
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
        text: `Oh my god. Yes! Thank god.`,
        options: [
            {
                next: 'UNCONSCIOUS',
                triggers: ['AskSituation']
            },
            {
                next: 'SELF_INTRODUCTION',
                triggers: ['AskWho']
            }
        ]
    },
    'SELF_INTRODUCTION': {
        text: `This is Jesse Harper. I'm a bioengineer currently training under Doctor Sloan Lee. But she's not doing very well. I'm not sure what's wrong with her`,
    },
    'UNCONSCIOUS': {
        text: `She ... she's unconscious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock`,
    },
    'I_M': {
        text: `I'm not entirely sure. My captain She- she's unconscious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock`,
    },
    'YEAH': {
        text: `Yeah, sorry. I need to explain myself more. This is Jesse Harper. I'm a bioengineer and Doctor Sloane Lee's apprentice, but, obviously, she's not doing very well. We're in a submarine, and our entire expedition has been underwater. For the past two weeks, we've been researching and trying to find growth of the medicinal plant, Selca Lexorium, and we think- or, I guess, we THOUGHT we finally found some, but something went wrong`,
    },
    'AH_RIGHT': {
        text: `Ah right. Ok, I need to explain myself a little better. Sorry. This is Jesse Harper. I'm a bioengineer and currently Doctor Sloane Lee's apprentice, but, obviously, she's not doing very well. We've been doing research and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples, but something went wrong.`,
    },
    'YEAH_SORRY': {
        text: `Yeah, sorry. I'm not explaining everything too clearly. We're in a submarine, and our entire expedition has been underwater. We've been researching and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks, and we think- or, I guess, we THOUGHT we finally found some, but something went wrong.`,
    },
    'WE_VE': {
        text: `We've been doing research and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples, but something went wrong`,
    },
    'YEAH_LIKE': {
        text: `Yeah. Like short for submarine. Our entire expedition has been underwater`,
    },
    'THE_MARIANA': {
        text: `The Mariana Trench, actually... Our project is pretty huge and also, kind of, well`,
    },
    'KIND_OF': {
        text: `Kind of illegal. But listen, you can ask me more questions later. Right now, I'm worried about Captain Lee`,
    },
    'SHE_S': {
        text: `She's still on the ground right now. I dragged her out of the airlock and removed her helmet. Once she was inside, I tried calling for help. We're lucky you responded`,
    },
    'I_CAN': {
        text: `I can, but she's still in her pressurized suit. It's really heavy, so I'll need to remove it first`,
    },
    'OF_COURSE': {
        text: `Of course she is! Don't you think I'd be more panicked if my only companion down here wasn't breathing? Well, I guess she's not my ONLY companion, because now you're helping me`,
    },
    'WELL_THIS': {
        text: `Well this situation isn't particularly calming`,
    },
    'ALRIGHT': {
        text: `Alright, I think I'm going to try to get her out of the suit. She should be moved to the bed, but this suit's way to huge to lift her in.`,
    },
    'THE_ILLEGALITY': {
        text: `The illegality makes our work seem worse than it actually is... Basically, exploration of this area of the trench is restricted. Only the government and the very specific researchers they select have access to this area`,
    },
    'ALSO': {
        text: `Also... We stole some things`,
    },
    'FROM': {
        text: `From... the government`,
    },
    'RESEARCH': {
        text: `Research`,
    },
    'I_KNOW': {
        text: `I know! I know. But listen, someone's dig around in this place. What are they keeping from us down here? The rest of the Mariana's been relatively easy to get a permit for for decades. Especially for scientists with meaningful research like Doctor Lee! Once the Captain and I started our studies and realized that the Selcal Lexorium potentially originated from this area... Well, she's not really the type to let the law get in the way of scientific progress. Our research is for the greater good! We could help thousands`,
    },
    'CAPTIAN.': {
        text: `Captian. And doctor. Both. She's very intelligent and diversely qualified, okay? And now we've been talking too long. I should get back to her`,
    },
    'LET_ME': {
        text: `Let me see what I can do`,
    },
    'I_AM': {
        text: `I'm not too sure... I think there might be something wrong with it. It's definitely not helping her. Trust me on this`,
    },
    'THE_SUIT’S': {
        text: `The suit’s so heavy! Agh! I might have to make an incision in order to peel this off her. Is it worth it`,
    },
    'ALRIGHT.': {
        text: `Alright. I’m going in from the side...but it smells kind of...odd. I think- shoot. I think she found exactly what we were tyring to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of reaserch on any of them given where they all grow. Oh god, this is gross`,
    },
    'IT_LOOKS': {
        text: `It looks dark and moldy, like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
    },
    'IT_SMELLS': {
        text: `It smells like moldy death- like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
    },
    'OH_GOD': {
        text: `Oh god, you’re right. That must be it! I’m going to make an incision on the other side to peel off the entire front of her suit`,
    },
    'SHED_BE': {
        text: `She’d be willing to risk her life for me, so I have to do the same. I’m going to pull the rest of her suit off by making an incision on the other side`,
    },
    'FINALLY GOT': {
        text: `Finally got the front off. Man, she really looks and smells like death. I wonder how this growth got through her suit. Some of it's on her skin`,
    },
    'YEAH_LET': {
        text: `Yeah, let me grab it`,
    },
    'OKAY': {
        text: `Okay, so we have the standard first aid stuff. I think cleaning her skin with antiseptic wipes would be a good move. There's also some bottles in here that look like they were thrown in by the Cap. The labels are hand written`,
    },
    'SO_I': {
        text: `So I got some surface grossness off, but the bacteria messed with her skin! The spots I cleaned are greenish and all bumpy. It's not something I can wipe off. Shit, and she’s getting paler. We need to try something else. Ugh, I wish I had more medical knowledge`,
    },
    'WOW_DOCTOR': {
        text: `Wow. Doctor Lee always did- does- have a sense of humor. One bottle says IN CASE OF BAD PLANTS the other has some Chinese characters and a picture of a red X over plant images. One of these has to be an antidote, right? But these dumb labels. Why does she do this to me`,
    },
    'THE_DIRECTIONS': {
        text: `The directions- Okay, wow there's directions but no proper label. Nice. It says to use a syringe to inject the liquid into her bloodstream around the affected area starting with 3mL. Increase dosage if needed? She wrote an acutal question mark in the directions`,
    },
    'OH_MAN': {
        text: `Oh man. If she dies, it's on her. But also, I really, really hope she lives. Here goes nothing`,
    },
    'OH_SHIT': {
        text: `Oh, shit. This stuff is making her worse! Her veins are popping out! The infected spots are so red! Hurry, what do I do`,
    },
    'WAIT': {
        text: `Wait, I think you’re right! The redness is reducing all the bumps. It's working`,
    },
    'OH_PLEASE': {
        text: `Oh, please. I did all the work. You're just on the other side of the radio`,
    },
    'YEAH_YEAH': {
        text: `Yeah, yeah. But listen, thank you. For everything. You've actually been pretty helpf- Oh my god! The captain! She's waking up`,
    },
    'WAIT_HER': {
        text: `Wait! Her veins are going back to normal. The redness is reducing all the bumps! It's working`,
    },
    'DONT_SAY': {
        text: `Don't say that to me! She's going to live. Crap, crap, crap. What do I do!`,
    }
};

var handlers = {
   'LaunchRequest': function() {
        if (Object.keys(this.attributes).length === 0) { // First time player
            this.attributes.state = game_state.START;
            this.attributes.game = {
                // 'state' : game_state.START,
                'progress' : {
                    'state': game_progress.PROLOGUE,
                },
                'currentIndex' : 'FIRST',
                'currentIntent' : ''
           };
        } else {
            // this.attributes.game.state = game_state.RETURNING;
            this.attributes.state = game_state.RETURNING;
        }
        this.emit('GenerateDialog');
   },

   // Call a state machine that handled the decisions made by the players
   'handleIntent': function() {
        var currIntent = this.attributes.game.currentIntent;
        this.attributes.game.progress = updateProgress(currIntent, this.attributes.game.progress);
        // this.emit(ParseIntent);
   },

    // Check response and determine the next dialog
    'ParseIntent': function() {
        var intentName = this.attributes.game.currentIntent;
        var nextIndex = checkTrigger(intentName, this.attributes.game.currentIndex);

        if (nextIndex === undefined) { // Did not trigger the next dialog
            this.attributes.state = game_state.HELP;
            this.emit('GenerateDialog');
            console.log('Failed to trigger');
        } else {
            this.attributes.game.currentIndex = nextIndex;
            console.log('Next script - ' + nextIndex);
            this.emit('GenerateDialog');
        }
    },

    // Get the next script and generate the response
    'GenerateDialog': function() {
        var speechOutput = '';

        if (this.attributes.state != game_state.GAME) {
            speechOutput += belowScript[this.attributes.state].text;
            this.attributes.state = game_state.GAME;
        }

        var currentIndex = this.attributes.game.currentIndex;
        speechOutput += belowScript[currentIndex].text;

        console.log('Reading script - ' + currentIndex);
        this.response.speak(speechOutput).listen();
        this.emit(':responseReady');
    },

    'IgnoreAction': function() {
        this.attributes.state = game_state.IGNORE;
        this.emit('GenerateDialog');
        console.log('User ignored');
    },

    'RepeatIntent': function() {
        this.attributes.state = game_state.REPEAT;
        this.emit('GenerateDialog');
        console.log('User asks to repeat');
    },

    'HelpIntent': function() {
        this.attributes.state = game_state.HELP;
        this.emit('GenerateDialog');
        console.log('HelpIntent');
    },

    // Unhandled only works when the script can be forwarded with 'anything'
    'Unhandled': function() {
        this.attributes.game.currentIntent = 'UnhandledIntent';
        this.emit('ParseIntent');
        console.log('Unhandled');
    },

    /* CUSTOM INTENTS */
    'YesIntent': function () {
        this.attributes.game.currentIntent = 'YesIntent';
        this.emit('ParseIntent');
    },

    'NoIntent': function () {
        this.attributes.game.currentIntent = 'NoIntent';
        this.emit('ParseIntent');
    },

    'HelloIntent': function () {
        this.attributes.game.currentIntent = 'HelloIntent';
        this.emit('ParseIntent');
    },

    'AskSituation': function () {
        this.attributes.game.currentIntent = 'AskSituation';
        this.emit('ParseIntent');
    },

    'AskWho': function () {
        this.attributes.game.currentIntent = 'AskWho';
        this.emit('ParseIntent');
    },

}

// Record player's new findings and update progress
var updateProgress = function(intentName, progress) {
    switch (progress) {
        case game_progress.PROLOGUE:
            return prologue(intentName, progress);
        case game_progress.PART_1:
            return part1(intentName, progress);
        case game_progress.PART_2:
            return part2(intentName, progress);
        case game_progress.PART_3:
            return part3(intentName, progress);
        default:
            return progress;
    }
}

var prologue = function(intentName, progress) {

    return progress;
}

var part1 = function(intentName, progress) {

    return progress;
}

var part2 = function(intentName, progress) {

    return progress;
}

var part3 = function(intentName, progress) {

    return progress;
}

// Find the next dialog that will trigger by the intent
var checkTrigger = function(intentName, currIndex) {
    console.log('Parsing intent: ' + intentName);
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

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
