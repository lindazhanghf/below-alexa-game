"use strict";

var Alexa = require("alexa-sdk");

var belowScript = [
    {
        text: "You're alone, manning your ship on a voyage through the Philippine Sea when you hear your radio: Hello? krckk-",
        options: [
            {
                next: 1,
                triggers: ['anything']
            }
        ]
    },
    {
        text: "Hello? Can anyone hear me? Please... Anyone.",
        options: [
            {
                next: 2,
                triggers: ['anything']
            }
        ]
    },
    // {
    //     text: "Please... Anyone."
    // },
    {
        text: "Oh my god. Yes! Thank god.",
        options: [
            {
                next: 4,
                triggers: ['askSituation']
            },
            {
                next: 3,
                triggers: ['askPerson']
            }
        ]
    },
    {
        text: "This is Jesse Harper. I'm a bioengineer currently training under Doctor Sloan Lee. But she's not doing very well. I'm not sure what's wrong with her."
    },
    {
        text: "She- she's unconcious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock."
    },
    {
        text: "I'm not entirely sure. My captain She- she's unconcious. She went out for samples, and it was only supposed to be 45 minutes, but she was gone for two hours. When she got back, she was weak and collapsed in the air lock."
    },
    {
        text: "Yeah, sorry. I need to explain myself more. This is Jesse Harper. I'm a bioengineer and Doctor Sloane Lee's apprentice, but, obviously, she's not doing very well. We're in a submarine, and our entire expedition has been underwater. For the past two weeks, we've been researching and trying to find growth of the medicinal plant, Selca Lexorium, and we think- or, I guess, we THOUGHT we finally found some, but something went wrong."
    },
    {
        text: "Ah right. Ok, I need to explain myself a little better. Sorry. This is Jesse Harper. I'm a bioengineer and currently Doctor Sloane Lee's apprentice, but, obviously, she's not doing very well. We've been doing research and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples, but something went wrong. "
    },
    {
        text: "Yeah, sorry. I'm not explaining everything too clearly. We're in a submarine, and our entire expedition has been underwater. We've been researching and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks, and we think- or, I guess, we THOUGHT we finally found some, but something went wrong. "
    },
    {
        text: "We've been doing research and trying to find growth of the medicinal plant, Selca Lexorium, for the past 2 weeks. We think- or, I guess, we THOUGHT we finally found some, so Captain Lee left the sub to collect some samples, but something went wrong."
    },
    {
        text: "Yeah. Like short for submarine. Our entire expedition has been underwater."
    },
    {
        text: "The Mariana Trench, actually... Our project is pretty huge and also, kind of, well-"
    },
    {
        text: "Kind of illegal. But listen, you can ask me more questions later. Right now, I'm worried about Captain Lee."
    },
    {
        text: "She's still on the ground right now. I dragged her out of the airlock and removed her helmet. Once she was inside, I tried calling for help. We're lucky you responded."
    },
    {
        text: "I can, but she's still in her pressurized suit. It's really heavy, so I'll need to remove it first."
    },
    {
        text: "Of course she is! Don't you think I'd be more panicked if my only companion down here wasn't breathing? Well, I guess she's not my ONLY companion, because now you're helping me."
    },
    {
        text: "Well this situation isn't particularly calming."
    },
    {
        text: "Alright, I think I'm going to try to get her out of the suit. She should be moved to the bed, but this suit's way to huge to lift her in. "
    },
    {
        text: "The illegality makes our work seem worse than it actually is... Basically, exploration of this area of the trench is restricted. Only the government and the very specific researchers they select have access to this area."
    },
    {
        text: "Also... We stole some things."
    },
    {
        text: "From... the government."
    },
    {
        text: "Research."
    },
    {
        text: "I know! I know. But listen, someone's dig around in this place. What are they keeping from us down here? The rest of the Mariana's been relatively easy to get a permit for for decades. Especially for scientists with meaningful research like Doctor Lee! Once the Captain and I started our studies and realized that the Selcal Lexorium potentially originated from this area... Well, she's not really the type to let the law get in the way of scientific progress. Our research is for the greater good! We could help thousands."
    },
    {
        text: "Captian. And doctor. Both. She's very intelligent and diversely qualified, okay? And now we've been talking too long. I should get back to her."
    },
    {
        text: "Let me see what I can do."
    },
    {
        text: "I'm not too sure... I think there might be something wrong with it. It's definitely not helping her. Trust me on this."
    },
    {
        text: "The suit’s so heavy! Agh! I might have to make an incision in order to peel this off her. Is it worth it?"
    },
    {
        text: "Alright. I’m going in from the side...but it smells kind of...odd. I think- shoot. I think she found exactly what we were tyring to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of reaserch on any of them given where they all grow. Oh god, this is gross."
    },
    {
        text: "It looks dark and moldy, like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry."
    },
    {
        text: "It smells like moldy death- like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry."
    },
    {
        text: "Oh god, you’re right. That must be it! I’m going to make an incision on the other side to peel off the entire front of her suit."
    },
    {
        text: "She’d be willing to risk her life for me, so I have to do the same. I’m going to pull the rest of her suit off by making an incision on the other side."
    },
    {
        text: "Finally got the front off. Man, she really looks and smells like death. I wonder how this growth got through her suit. Some of it's on her skin."
    },
    {
        text: "Yeah, let me grab it."
    },
    {
        text: "Okay, so we have the standard first aid stuff. I think cleaning her skin with antiseptic wipes would be a good move. There's also some bottles in here that look like they were thrown in by the Cap. The labels are hand written."
    },
    {
        text: "So I got some surface grossness off, but the bacteria messed with her skin! The spots I cleaned are greenish and all bumpy. It's not something I can wipe off. Shit, and she’s getting paler. We need to try something else. Ugh, I wish I had more medical knowledge!"
    },
    {
        text: "Wow. Doctor Lee always did- does- have a sense of humor. One bottle says IN CASE OF BAD PLANTS the other has some Chinese characters and a picture of a red X over plant images. One of these has to be an antidote, right? But these dumb labels. Why does she do this to me?"
    },
    {
        text: "The directions- Okay, wow there's directions but no proper label. Nice. It says to use a syringe to inject the liquid into her bloodstream around the affected area starting with 3mL. Increase dosage if needed? She wrote an acutal question mark in the directions."
    },
    {
        text: "Oh man. If she dies, it's on her. But also, I really, really hope she lives. Here goes nothing."
    },
    {
        text: "Oh, shit. This stuff is making her worse! Her veins are popping out! The infected spots are so red! Hurry, what do I do?"
    },
    {
        text: "Wait, I think you’re right! The redness is reducing all the bumps. It's working!"
    },
    {
        text: "Oh, please. I did all the work. You're just on the other side of the radio."
    },
    {
        text: "Yeah, yeah. But listen, thank you. For everything. You've actually been pretty helpf- Oh my god! The captain! She's waking up!"
    },
    {
        text: "Wait! Her veins are going back to normal. The redness is reducing all the bumps! It's working!"
    },
    {
        text: "Don't say that to me! She's going to live. Crap, crap, crap. What do I do!?"
    }
]

// var handlers = {
//   'LaunchRequest': function() {
//     if (Object.keys(this.attributes).length === 0) { // First time player
//       this.attributes.game = {
//         'currentScript' : 0
//       };
//       this.response.listen("Welcome to below game, you can pause this game anytime by saying exit and your progress will be saved." +
//         "You are alone, manning your ship on a voyage through the Philippine Sea when you hear your radio");
//     } else {
//       this.response.listen("Welcome back to below game, you can restart the game by saying start over.")
//     }
//     this.emit(':responseReady');
//   },
//   // 'LanguageIntent': function () {
//   //   var myLanguage = this.event.request.intent.slots.language.value;
//   //   if (myLanguage == "python") {
//   //       this.response.speak("Correct! Python is the most popular language.");
//   //   }
//   //   else {
//   //       this.response.speak("You guessed that " + myLanguage + " is the most popular. Actually, Python is our most popular language");
//   //   }
//   //   this.emit(':responseReady');
//   // }
// }
// exports.handler = function(event, context, callback){
//     var alexa = Alexa.handler(event, context);
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };


/* Learn-Alexa Freeform project */

var DECK_LENGTH = belowScript.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {
    if (Object.keys(this.attributes).length === 0) { // First time player
        this.attributes.game = {
            'scriptIndex' : 0
        }
        this.response.speak('Welcome to below game, you can pause this game anytime by saying exit and your progress will be saved.')
        this.AskQuestion();
        console.log('First time player');

    } else {
        this.response.speak('Welcome back to below game, you can restart the game by saying start over.')
        this.AskQuestion();
        console.log('Returning player');
    }

    this.emit(':responseReady');
  },

  // User gives an answer
  // 'AnswerIntent': function() {
  // },

   // Test my {language} knowledge
  'AskQuestion': function() {
    // var scriptIndex = this.attributes.flashcards.languages[currentLanguage].scriptIndex;
    var scriptIndex = this.attributes.game.scriptIndex;
    var currentScript = belowScript[scriptIndex].text;

    console.log('Reading script - ' + scriptIndex);
    this.response.listen(currentScript);
    this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Save state
  'SessionEndedRequest': function() {
    console.log('session ended!');
    this.emit(':saveState', true);
  },

  // Check response and determine the next script
    'CheckResponse': function(intentName) {
        console.log('Parsing intent: ' + intentName);
        var scriptIndex = this.attributes.game.scriptIndex;
        var nextIndex = -1;
        belowScript[scriptIndex].options.forEach( function(option) {
            option.triggers.forEach( function(trigger) {
                if (intentName == trigger || trigger === 'anything') {
                    nextIndex = option.next;
                }
            })
        });

        if (nextIndex == -1) { // Did not trigger the next dialog
            this.response.listen('I am not sure what you mean. What information do you want to know?');
            this.emit(':responseReady');
            console.log('Failed to trigger');
        } else {
            this.attributes.game.scriptIndex = nextIndex;
            console.log('Next script - ' + nextIndex);
            this.AskQuestion();
        }
    },

  /* CUSTOM INTENT */
    'AskSituation': function() {
        this.CheckResponse('AskSituation');
    }

};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);

    // alexa.dynamoDBTableName = 'BelowGame';
    alexa.execute();
};
