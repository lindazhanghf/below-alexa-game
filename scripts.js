var belowScript = {
    'START': {
        text: `Welcome to Below, an interactive fiction you play by talking to a person through the radio. Your progress will be saved upon exiting the game. You can always say 'I need help' if you are stuck. <break time="1s"/> `
    },
    'RETURNING': {
        text: `Welcome back to Below, you can restart the game by saying start over. You can always say 'I need help' if you are stuck. <break time="1s"/> `
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
        text: `You have finished the first chapter of Below. The second chapter is still under development. You can exit the game or start over to uncover more stories below the surface. `
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
        text: `You're alone, manning your ship on a voyage through the Philippine Sea when you hear your radio: <break time="0.5s"/>  Hello? `,
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
        prompt: '',
    },

    /* PART 2 */
    'CONTINUE_SITUATION': {
        text: `And now we've been talking too long. I should get back to her. She's still on the ground in her suit. I dragged her out of the airlock and removed her helmet. Her face is quite red. `,
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
        reprompt: `What should I do here? `
    },
    'HER_SITUATION': {
        text: `She's still on the ground in her suit. I dragged her out of the airlock and removed her helmet. Her face is quite red. What should I do here? `,
        options: [
            {
                next: 'TRY_MOVE',
                triggers: ['Command_Move', 'WaitIntent']
            },
            {
                next: 'PRESSURIZED_SUIT',
                triggers: ['Command_Remove']
            }
        ],
        prompt: ` 'is she breathing?' or 'lay her down on a bed`,
    },
    'BREATH': {
        text: `Of course she is breathing! Don't you think I'd be more panicked if my only companion down here wasn't breathing? Well, I guess she's not my ONLY companion, because now you're helping me. Anyway, first things first, should I move her to her bed? `,
        options: [
            {
                next: 'TRY_MOVE',
                triggers: ['YesIntent', 'Command_Move', 'NextIntent']
            },
        ],
        prompt: ` 'Good idea'`,
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
        prompt: ` 'go ahead' '`,
    },
    'INCISION': { // zipper sound, or cutting cloths sound, grossed out voice
        text: `Alright. I’m going in from the side...but it smells kind of...odd.  <break time="1s"/>  Oh god, this is gross`,
        prompt: ` 'what does it look like' or 'what does it smell like'`,
    },
    'IT_LOOKS': {
        text: `It looks dark and moldy, Some of it's on her skin! This looks horrible. We need to do something about it`,
        prompt: ` 'we need to get it off her skin', or 'what is the dark thing?'`,
    },
    'IT_SMELLS': {
        text: `It smells like moldy death- like something's been decaying on the inside of this suit for a really long time. It's not possible though, because she was only gone for two hours. This is bad. We need to hurry`,
        prompt: ` 'we have to get rid of that'`,
    },
    'GUESS_PLANT': { // INFO
        text: `I think- shoot. I think she found exactly what we were trying to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are toxic. There's not a lot of research on any of them given where they all grow.`,
        prompt: ` 'we should remove her suit'`,
        options: [
            {
                next: 'PEEL_OFF',
                triggers: ['YesIntent', 'NextIntent', 'Command_Remove']
            },
            {
                next: 'RISK_LIFE',
                triggers: ['NoIntent']
            }
        ],
        reprompt: ` I think we need to remove her suit.`,
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
        prompt: ` 'Try the antiseptic' or 'Use the other bottles'`,
    },
    'USE_ANTISEPTIC': {
        text: `So I got some surface grossness off, but the bacteria messed with her skin! The spots I cleaned are greenish and all bumpy. It's not something I can wipe off. Shoot, and she’s getting paler. We need to try something else. Ugh, I wish I had more medical knowledge`,
        reprompt: ` Maybe we should see the other bottles`,
        prompt: ` 'what are the other bottles?'`,
    },
    'USED_ANTISEPTIC': {
        text: ` I have already tried the antispetic wipes, and it doesn't help much. Maybe we should look at the other bottles? `,
        prompt: ` 'Use the other bottles'`,
    },
    'OTHER_BOTTLES': { // ORIGINAL: "Wow. Doctor Lee always did- does- have a sense of humor."
        text: ` One bottle says IN CASE OF BAD PLANTS, the other has some Chinese characters and a picture of a red X over an image of a plant. One of these has to be an antidote, right? But these dumb labels. Why does she do this to me?`,
        first: `Wow. Doctor Lee always did a sense of humor. `,
        prompt: ` 'What is in the plant image?'`,
        reprompt: ` Should I try the one for bad plant, or the one with plant image?`,
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
        text: `The box contains several shots. No directions- <break time="0.5s"/> Wait, nevermind. There are some tiny text at the bottom. `,
    },
    'DIRECTION_BADPLANT': {
        text: `It says 'one shot. safe'. 'two shots, question mark'. She wrote an actual question mark in the directions.`,
        first: `It doesn't have any directions-  <break time="0.5s"/> Wait, nevermind. There are some tiny text at the bottom. `,
        reprompt: ` Should I use this one? Or do you want to see the other bottles?`,
    },
    'START_BADPLANT': {
        text: `Okay, I will use one shot first.  <break time="2s"/> `,
    },
    'START_IMAGE': {
        text: `Alright then, I will start with 3 milliliter.  <break time="2s"/> `,
    },
    'SECOND_BADPLANT': {
        text: `I guess I am gonna use another shot.  <break time="2s"/> `,
    },
    'SECOND_IMAGE': {
        text: `Okay, I am adding 3 more milliliter.  <break time="2s"/> `,
    },
    'CONDITION_SAME': {
        text: `I am not sure about this. It doesn't seem to work. But her face is becoming more and more pale! What should I do? `,
        prompt: ` 'try waiting for a second', or 'try the one for bad plant'`
    },
    'CONDITION_WORSE': {
        first: `I have a bad feeling about this ... `,
        text: `Her face is even more pale! Her breath is becoming unstable! Hurry, what do I do? `,
    },
    'CONDITION_WORST': {
        text: `Oh, no. This stuff is making her worse! Her veins are popping out! The infected spots are so red! No... How can I stop this... `,
        options: [
            {
                next: 'END_DEAD',
                triggers: ['anything']
            },
        ],
    },
    'WAIT': {
        text: ` Wow, I think you’re right! Her face is slowly recovering to normal. It's working! `,
        options: [
            {
                next: 'END_WAKE',
                triggers: ['anything']
            }
        ]
    },
    'WAIT_FROMWORSE': {
        text: `Wait, I think you’re right! Her veins are going back to normal. The redness is reducing all the bumps. It's working`,
        options: [
            {
                next: 'END_WAKE',
                triggers: ['anything']
            }
        ]
    },
    'END_WAKE': { // ORIGINAL: Yeah, yeah. But listen, thank you.
        text: `Thank you. For everything. You've actually been pretty helpful-<break time="0.5s"/> Oh my god! The captain! She's waking up`,
        options: [
            {
                next: 'END',
                triggers: ['anything']
            }
        ]
    },
    'END_DEAD': {
        text: `Ohhhh <break time="0.5s"/> no, I think we lost her... Its all my fault... I'm sorry Doctor Lee... I am so sorry... I think I've had enough, I will end the call here. `,
    },
    'GUESS_IMAGE': {
        text: `Hmmmmm, the plant image looks kinda familiar ... <break time="1s"/> seems like a plant from the Selca family.  <break time="1s"/> shoot. I think she found exactly what we were trying to avoid. The Selca Lexorium has some cousins with similar physical traits, and some are very toxic. This could be the cure, right?`,
    },
    'REPEAT_GUESS': {
        text: `Wait ... the plant image looks kinda familiar ... <break time="1s"/> I think it might be it! The toxic cousin of Selca Lexorium that she might encountered! You think we should use this?.`,
    },
};
