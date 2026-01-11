const els = {
    // ... (Overlays & Audio same as yours)
    blink: document.getElementById("blink-overlay"),
    audio: document.getElementById("wake-audio"), 
    sfxBottle: document.getElementById("sfx-bottle"),
    sfxCorrect: document.getElementById("sfx-correct"),
    sfxWrong: document.getElementById("sfx-wrong"),
    sfxPing: document.getElementById("sfx-ping"),
    sfxGlitch: document.getElementById("sfx-glitch"),
    winnerAudio: document.getElementById("winner-audio"),

    // Scenes
    s1: document.getElementById("scene-1"),
    sChar: document.getElementById("scene-character-select"),
    s2: document.getElementById("scene-2"),
    s3: document.getElementById("scene-3"),
    s5: document.getElementById("scene-5"),
    s6: document.getElementById("scene-6"),
    s7: document.getElementById("scene-7"),
    s8: document.getElementById("scene-8"),
    s10: document.getElementById("scene-10"),
    s11: document.getElementById("scene-11"),
    s12: document.getElementById("scene-12"),
    s13: document.getElementById("scene-13"),
    s14: document.getElementById("scene-14"),

    // Buttons & UI
    startBtn: document.getElementById("start-btn"),
    confirmBtn: document.getElementById("confirm-character"),
    nextBtn: document.getElementById("next-btn"),
    exploreBtn: document.getElementById("explore-btn"),
    videoContinueBtn: document.getElementById("video-continue-btn"),
    impactNextBtn: document.getElementById("impact-next-btn"),
    cardsOkBtn: document.getElementById("cards-ok-btn"),
    startQuizBtn: document.getElementById("start-quiz-btn"),
    letsGoBtn: document.getElementById("lets-go-btn"),

   // Scene 2/3 Elements
    wakeText: document.querySelector(".wake-text"),
    instruction: document.querySelector(".instruction"),
    bottleContainer: document.querySelector(".bottle-container"),
    bottle: document.querySelector(".bottle"),
    paper: document.querySelector(".message-paper"),
    clickContinue: document.querySelector(".click-continue"),
    dialogueBox: document.querySelector(".dialogue-box"),
    playerIcon: document.querySelector(".player-icon"),
    dialogueText: document.querySelector(".dialogue-text"),
    speakerLabel: document.querySelector(".speaker-label"),

   // Scene 5/6/8 (Ducks & Bubbles)
    duckBubble5: document.querySelector("#scene-5 .duck-speech-bubble"),
    speechContent5: document.querySelector("#scene-5 .speech-content"),
    duck6: document.querySelector(".duck-moving"),
    duckBubble6: document.getElementById("duck-speech-6"),
    arrow6: document.querySelector(".continue-arrow-small"),
    impactContent: document.querySelector(".impact-content"),
    typingHeader: document.querySelector(".typing-header"),
    impactText: document.querySelector(".impact-text"),
    campfireBubble: document.querySelector("#scene-8 .duck-speech-bubble"),
    campfireSpeech: document.querySelector("#scene-8 .speech-content"),

   // Quiz Elements
    quizBtns: document.querySelectorAll(".quiz-btn"),
    quizNextBtn: document.getElementById("quiz-next-btn"),
    quizRetryBtn: document.getElementById("quiz-retry-btn"),
    questionBox: document.getElementById("question-box"),
    explanationText: document.getElementById("explanation-text"),
    quizFeedback: document.getElementById("quiz-feedback"),
    progressText: document.getElementById("quiz-progress"),

    // Victory/Fireworks
    victoryOptions: document.getElementById("victory-options"),
    btnHome: document.getElementById("btn-home"),
    btnNext: document.getElementById("btn-next"),
    finalSpeechBox: document.getElementById("final-speech-box"),
    finalText: document.getElementById("final-text"),
    fireworksContainer: document.getElementById("fireworks-container"),

    // Scene 12 (Scam)
    scamNarrative: document.querySelector(".scam-narrative"),
    phoneContainer: document.querySelector(".phone-container"),
    phoneNotification: document.getElementById("phone-notification"),
    phoneChat: document.getElementById("phone-chat"),
    clawrenceMsg: document.getElementById("clawrence-msg"),
    s12Dialogue: document.getElementById("s12-dialogue"),
    s12Text: document.querySelector("#s12-dialogue .dialogue-text"),
    s12Icon: document.querySelector("#s12-dialogue .player-icon"),
    s12Arrow: document.getElementById("s12-arrow"),
    scamChoices: document.getElementById("scam-choices"),
    scamBtns: document.querySelectorAll(".scam-btn"),
    scamFeedback: document.getElementById("scam-feedback"),
    scamFeedbackText: document.getElementById("scam-feedback-text"),
    scamTryAgain: document.getElementById("scam-try-again"),
    scamNextScene: document.getElementById("scam-next-scene"), // FIXED: Added comma here
    
    // Ending
    endingSpeech: document.getElementById("ending-speech"),
    sailHomeBtn: document.getElementById("sail-home-btn"),
    playAgainBtn: document.getElementById("play-again-btn"),
    endingSpeechBubble: document.getElementById("ending-speech-bubble"),
};

// ... (State variables and storyLines remain same)

// --- FIXED QUIZ LOGIC (Renamed Flash Classes) ---
els.quizBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const choice = parseInt(btn.dataset.index);
        const correct = quizData[currentQuestion].correct;

        if (choice === correct) {
            if(els.sfxCorrect) els.sfxCorrect.play();
            els.s10.classList.add("quiz-flash-green"); // Use the quiz-specific name
            setTimeout(() => els.s10.classList.remove("quiz-flash-green"), 500);
            
            els.explanationText.textContent = quizData[currentQuestion].explain;
            els.quizFeedback.classList.remove("hidden");
            els.quizNextBtn.classList.remove("hidden");
            els.quizRetryBtn.classList.add("hidden");
            els.quizBtns.forEach(b => b.disabled = true);
        } else {
            if(els.sfxWrong) els.sfxWrong.play();
            els.s10.classList.add("quiz-flash-red"); // Use the quiz-specific name
            setTimeout(() => els.s10.classList.remove("quiz-flash-red"), 500);
            
            els.explanationText.textContent = "That's not quite right...";
            els.quizFeedback.classList.remove("hidden");
            els.quizRetryBtn.classList.remove("hidden");
            els.quizNextBtn.classList.add("hidden");
        }
    });
});

// --- FIXED SCENE 12 TAP OVERLAY ---
function runScene12Sequence() {
    setTimeout(() => {
        els.scamNarrative.classList.remove("hidden");
        typeText(els.scamNarrative, "The island goes quiet...", () => {
            setTimeout(() => {
                typeText(els.scamNarrative, "Your phone suddenly buzzes. Strange, on this island.", () => {
                    setTimeout(() => {
                        els.scamNarrative.classList.add("hidden");
                        els.phoneContainer.classList.add("slide-up");
                        setTimeout(() => {
                            if(els.sfxPing) els.sfxPing.play();
                            els.phoneContainer.classList.add("vibrate");
                            setTimeout(() => els.phoneContainer.classList.remove("vibrate"), 500);
                            els.phoneNotification.classList.remove("hidden");

                            const tapOverlay = document.createElement("div");
                            tapOverlay.id = "phone-tap-overlay";
                            tapOverlay.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; z-index:999; cursor:pointer; display:flex; align-items:flex-end; justify-content:center; padding-bottom:50px; color:white; font-weight:bold; text-shadow: 2px 2px 4px black;";
                            tapOverlay.innerHTML = "Tap to check phone...";
                            els.s12.appendChild(tapOverlay);

                            // FIXED: Added listener to the OVERLAY, not the document
                            tapOverlay.addEventListener("click", () => {
                                tapOverlay.remove();
                                els.s12Dialogue.classList.remove("hidden");
                                els.s12Dialogue.querySelector(".speaker-label").textContent = "You";
                                els.s12Icon.innerHTML = `<img src="assets/images/${characters[selectedCharacter]}" alt="Icon">`;
                                
                                typeText(els.s12Text, "Clawrence? Clawrence from back home? This profile picture looks familiar too...", () => {
                                    els.s12Arrow.classList.remove("hidden");
                                });
                            });
                        }, 800);
                    }, 1500);
                });
            }, 1500);
        });
    }, 1000);
}
// --- 2. GAME STATE ---
let selectedCharacter = null;
let currentWakeLine = 0;
let isTyping = false;
let dialogueStep = 0;
let flippedCards = new Set();
let currentQuestion = 0;
let fireworkInterval; 

const storyLines = [
    "You wake up on warm sand... and the air smells of salt.",
    "The last thing you remember was using a Generative AI interface...",
    "Confused... You take a long look around.",
    "Suddenly, a glint catches your eye."
];

const characters = {
    seashell: "seashell.png",
    compass: "compass.png",
    sealion: "sealion.png",
    jellyfish: "jellyfish.png",
    coconut: "coconut.png"
};

const quizData = [
    {
        q: "What is Generative AI?",
        a: [
            "A system that only stores and repeats information exactly as it was given",
            "A type of AI that generates new content like text, images, audio, or video based on patterns it has learned",
            "A tool that can always tell the difference between real and fake information",
            "A program that only works when a human manually controls every output"
        ],
        correct: 1,
        explain: "Correct! Generative AI learns from large amounts of data and uses those patterns to create new, original outputs."
    },
    {
        q: "A realistic AI-generated video of a public figure saying something they never said is called:",
        a: ["Misinformation", "Bias", "Deepfake", "Data leak"],
        correct: 2,
        explain: "Correct! Deepfakes use AI to fake someone’s face or voice, which can mislead, scam, or damage reputations."
    },
    {
        q: "Generative AI always checks if the information it gives is true/correct.",
        a: ["True", "False", "", ""],
        correct: 1,
        explain: "Correct! Generative AI predicts what sounds correct, not what is correct."
    },
    {
        q: "Why does generative AI make online scams and frauds more dangerous?",
        a: [
            "It replaces human scammers",
            "It can generate more convincing messages at scale",
            "It only targets certain age groups",
            "It requires advanced technical skills to use"
        ],
        correct: 1,
        explain: "Correct! Generative AI can quickly produce realistic messages, allowing scams to be personalised and spread to many people at once."
    }
];

// --- 3. CORE UTILITIES ---

function switchScene(from, to) {
    from.classList.remove("active");
    setTimeout(() => {
        to.classList.add("active");
    }, 500);
}

function typeText(element, text, callback) {
    element.textContent = "";
    element.classList.remove("hidden");
    isTyping = true;
    let i = 0;
    const speed = 30;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    type();
}

function setPlayerIcon(imgName) {
    els.playerIcon.innerHTML = `<img src="assets/images/${imgName}" alt="Icon">`;
}

function createFireworks() {
    for (let i = 0; i < 50; i++) {
        const fw = document.createElement("div");
        fw.className = "firework";
        fw.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        fw.style.left = "50%";
        fw.style.top = "50%";
        fw.style.setProperty('--x', `${(Math.random() - 0.5) * 600}px`);
        fw.style.setProperty('--y', `${(Math.random() - 0.5) * 600}px`);
        els.fireworksContainer.appendChild(fw);
        setTimeout(() => fw.remove(), 1000);
    }
}

function loadQuestion() {
    const data = quizData[currentQuestion];
    els.questionBox.textContent = data.q;
    els.progressText.textContent = `${currentQuestion + 1}/4`;
    els.quizFeedback.classList.add("hidden");

    if (currentQuestion === quizData.length - 1) {
        els.quizNextBtn.textContent = "Complete";
    } else {
        els.quizNextBtn.textContent = "Next Question";
    }
    
    els.quizBtns.forEach((btn, i) => {
        btn.textContent = data.a[i];
        btn.classList.toggle("hidden", data.a[i] === "");
        btn.disabled = false;
    });
}

// --- 4. EVENT LISTENERS & FLOW ---

els.startBtn.addEventListener("click", () => switchScene(els.s1, els.sChar));

document.querySelectorAll(".character-option").forEach(opt => {
    opt.addEventListener("click", function () {
        document.querySelectorAll(".character-option").forEach(o => o.classList.remove("selected"));
        this.classList.add("selected");
        selectedCharacter = this.dataset.character;
        els.confirmBtn.classList.remove("hidden");
    });
});

els.confirmBtn.addEventListener("click", () => {
    els.blink.classList.add("blink");
    setTimeout(() => {
        switchScene(els.sChar, els.s2);
        if(els.audio) {
            els.audio.volume = 0.2;
            els.audio.play().catch(() => console.log("Audio play blocked"));
        }

        setTimeout(() => {
            typeText(els.wakeText, storyLines[0], () => els.nextBtn.classList.remove("hidden"));
        }, 1500);
    }, 1200);
});

els.nextBtn.addEventListener("click", () => {
    if (isTyping) return;
    currentWakeLine++;
    els.nextBtn.classList.add("hidden");

    if (currentWakeLine < storyLines.length) {
        typeText(els.wakeText, storyLines[currentWakeLine], () => {
            if (currentWakeLine === storyLines.length - 1) {
                els.exploreBtn.classList.remove("hidden");
            } else {
                els.nextBtn.classList.remove("hidden");
            }
        });
    }
});

els.exploreBtn.addEventListener("click", () => {
    switchScene(els.s2, els.s3);
    els.bottleContainer.classList.add("bottle-locked");
    setTimeout(() => {
        typeText(els.instruction, "Click on the bottle to find out what the message says!", () => {
            els.bottleContainer.classList.remove("bottle-locked");
        });
    }, 1000);
});

els.bottleContainer.addEventListener("click", () => {
    els.instruction.classList.add("hidden");
    if(els.sfxBottle) els.sfxBottle.play().catch(e => console.log("Sound play prevented:", e));
    els.bottle.classList.add("pop-out");
    setTimeout(() => {
        els.paper.classList.remove("hidden");
        setTimeout(() => {
            els.clickContinue.classList.remove("hidden");
        }, 1200);
    }, 600);
});

els.paper.addEventListener("click", () => {
    if (els.clickContinue.classList.contains("hidden")) return;
    els.paper.classList.add("hidden");
    els.dialogueBox.classList.remove("hidden");
    dialogueStep = 0;
    els.speakerLabel.textContent = "You";
    setPlayerIcon(characters[selectedCharacter]);
    typeText(els.dialogueText, "Ahh… I’m here to learn about Generative AI and the possible online harms that come with it. Maybe I did something risky to end up here…");
});

document.querySelector(".continue-arrow").addEventListener("click", () => {
    if (isTyping) return;
    if (dialogueStep === 0) {
        dialogueStep = 1;
        els.speakerLabel.textContent = "Sailor Duck";
        setPlayerIcon("sailor_duck.png");
        typeText(els.dialogueText, "Ahoy Explorer! I'll be your guide for your journey today, you'll learn more about Generative AI with me. Let's Go!");
    } else if (dialogueStep === 1) {
        els.dialogueBox.classList.add("hidden");
        switchScene(els.s3, els.s5);
        setTimeout(() => {
            els.duckBubble5.classList.remove("hidden");
            typeText(els.speechContent5, "Watch this video to learn about Generative AI! Remember... Pay close attention!");
        }, 1000);
    }
});

els.videoContinueBtn.addEventListener("click", () => {
    switchScene(els.s5, els.s6);
    setTimeout(() => {
        els.duck6.classList.add("duck-forward");
        setTimeout(() => {
            els.duckBubble6.classList.remove("hidden");
            typeText(els.duckBubble6.querySelector(".speech-content"), "Why does this matter, you might ask?", () => {
                els.arrow6.classList.remove("hidden");
            });
        }, 1200);
    }, 500);
});

els.arrow6.addEventListener("click", () => {
    if (isTyping) return;
    els.arrow6.classList.add("hidden");
    els.duckBubble6.classList.add("hidden");
    els.impactContent.classList.remove("hidden");
    typeText(els.typingHeader, "Why it Matters", () => {
        els.typingHeader.style.borderRight = "none";
        const bodyText = "Generative AI is powerful because it’s accessible. But that accessibility means its risks scale fast! It also can’t always tell fact from fiction. If a system generates something harmful, the impact can multiply quickly.";
        typeText(els.impactText, bodyText, () => {
            els.impactNextBtn.classList.remove("hidden");
        });
    });
});

els.impactNextBtn.addEventListener("click", () => switchScene(els.s6, els.s7));

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function () {
        this.classList.toggle("flipped");
        flippedCards.add(this.getAttribute("data-id"));
        if (flippedCards.size === 5) els.cardsOkBtn.classList.remove("hidden");
    });
});

els.cardsOkBtn.addEventListener("click", () => {
    switchScene(els.s7, els.s8);
    setTimeout(() => {
        els.campfireBubble.classList.remove("hidden");
        const speech = "Welcome to the Campfire! We'll now test your understanding! Answer all questions correctly to proceed.";
        typeText(els.campfireSpeech, speech, () => {
            els.startQuizBtn.classList.remove("hidden");
        });
    }, 1200);
});

els.startQuizBtn.addEventListener("click", () => {
    switchScene(els.s8, els.s10);
    currentQuestion = 0;
    loadQuestion();
});

els.quizBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const choice = parseInt(btn.dataset.index);
        const correct = quizData[currentQuestion].correct;

        if (choice === correct) {
            if(els.sfxCorrect) els.sfxCorrect.play();
            els.s10.classList.add("flash-green");
            setTimeout(() => els.s10.classList.remove("flash-green"), 500);
            
            els.explanationText.textContent = quizData[currentQuestion].explain;
            els.quizFeedback.classList.remove("hidden");
            els.quizNextBtn.classList.remove("hidden");
            els.quizRetryBtn.classList.add("hidden");
            els.quizBtns.forEach(b => b.disabled = true);
        } else {
            if(els.sfxWrong) els.sfxWrong.play();
            els.s10.classList.add("flash-red");
            setTimeout(() => els.s10.classList.remove("flash-red"), 500);
            
            els.explanationText.textContent = "That's not quite right...";
            els.quizFeedback.classList.remove("hidden");
            els.quizRetryBtn.classList.remove("hidden");
            els.quizNextBtn.classList.add("hidden");
        }
    });
});

els.quizRetryBtn.addEventListener("click", () => {
    els.quizFeedback.classList.add("hidden");
});

els.quizNextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else { 
        switchScene(els.s10, els.s11);
        fireworkInterval = setInterval(createFireworks, 500);
        setTimeout(() => {
            const vicDuck = document.getElementById("victory-duck");
            const vicBubble = document.getElementById("victory-bubble");
            const vicText = vicBubble.querySelector(".speech-content");
            vicDuck.classList.add("duck-forward");
            setTimeout(() => {
                vicBubble.classList.remove("hidden");
                typeText(vicText, "Good Job! You are getting the hang of this.", () => {
                    els.victoryOptions.classList.remove("hidden");
                });
            }, 1000);
        }, 500);
        setTimeout(() => clearInterval(fireworkInterval), 10000);
    }
});

els.btnHome.addEventListener("click", () => {
    els.victoryOptions.classList.add("hidden");
    els.finalSpeechBox.classList.remove("hidden");
    typeText(els.finalText, "Almost there, explorer. Just one last challenge until you are qualified to leave this island.");
});

els.btnNext.addEventListener("click", () => {
    els.victoryOptions.classList.add("hidden");
    els.finalSpeechBox.classList.remove("hidden");
    typeText(els.finalText, "Love the enthusiasm! Bring it on to the next challenge!");
});

// --- SCENE 12 LOGIC ---

els.letsGoBtn.addEventListener("click", () => {
    if (typeof fireworkInterval !== 'undefined') clearInterval(fireworkInterval);
    switchScene(els.s11, els.s12);
    runScene12Sequence();
});

// --- UPDATED SCENE 12 LOGIC ---

els.s12Arrow.addEventListener("click", () => {
    if (isTyping) return;
    els.s12Dialogue.classList.add("hidden");
    els.s12Arrow.classList.add("hidden");
    els.phoneNotification.classList.add("hidden");
    els.phoneChat.classList.remove("hidden");

    setTimeout(() => {
        els.clawrenceMsg.classList.remove("hidden");
        setTimeout(() => {
            els.scamChoices.classList.remove("hidden");
        }, 1000);
    }, 500);
});

els.scamBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const choice = btn.dataset.choice;
        els.scamChoices.classList.add("hidden");

        if (choice === "1") {
            // CHOICE 1: RISKY
            if(els.sfxGlitch) els.sfxGlitch.play();
            els.s12.classList.add("flash-red");
            els.phoneContainer.classList.add("vibrate");
            
            setTimeout(() => {
                els.s12.classList.remove("flash-red");
                els.phoneContainer.classList.remove("vibrate");
            }, 600);

            showScamFeedback(
                "Risky choice! Your image can be reused, altered, or turned into a deepfake. <br><br> AI tools can manipulate faces, voices, and identities convincingly. Sending images on demand can lead to impersonation, scams, or image abuse.",
                true // Show Try Again
            );

        } else if (choice === "2") {
            // CHOICE 2: SMART
            if(els.sfxCorrect) els.sfxCorrect.play();
            els.s12.classList.add("flash-green");
            setTimeout(() => els.s12.classList.remove("flash-green"), 500);

            showScamFeedback(
                "Smart choice! Real friends know real memories. Scammers and deepfakes can copy faces and voices but they can’t fake shared experiences easily.",
                false // Show Continue
            );

        } else if (choice === "3") {
            // CHOICE 3: REFUSE
            if(els.sfxCorrect) els.sfxCorrect.play();
            els.s12.classList.add("flash-green");
            setTimeout(() => els.s12.classList.remove("flash-green"), 500);

            showScamFeedback(
                "That's right! You stopped a potential impersonation. Sometimes the bravest move is saying no. <br><br> Blocking and reporting cuts off harm before it spreads.",
                false // Show Continue
            );
        }
    });
});

function showScamFeedback(text, isError) {
    els.scamFeedback.classList.remove("hidden");
    // Use innerHTML instead of textContent so the <br> tags work
    els.scamFeedbackText.innerHTML = ""; 
    
    // Simple typing effect for the feedback
    let i = 0;
    const speed = 20;
    function type() {
        if (i < text.length) {
            // Check for <br> tags to render them immediately
            if (text.substring(i, i+4) === "<br>") {
                els.scamFeedbackText.innerHTML += "<br>";
                i += 4;
            } else {
                els.scamFeedbackText.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        } else {
            // Show the correct button after typing finishes
            if (isError) {
                els.scamTryAgain.classList.remove("hidden");
                els.scamNextScene.classList.add("hidden");
            } else {
                els.scamNextScene.classList.remove("hidden");
                els.scamTryAgain.classList.add("hidden");
            }
        }
    }
    type();
}

// Reset the scene when "Try Again" is clicked
els.scamTryAgain.addEventListener("click", () => {
    els.scamFeedback.classList.add("hidden");
    els.scamTryAgain.classList.add("hidden");
    els.scamChoices.classList.remove("hidden");
});


els.scamNextScene.addEventListener("click", () => {
    // 1. MUSIC SWITCHING LOGIC
    if (els.audio) {
        els.audio.pause(); // Stops the guitar music
        els.audio.currentTime = 0; // Resets it to the beginning
    }
    
    if (els.winnerAudio) {
        els.winnerAudio.volume = 0.5; // Set a comfortable volume
        els.winnerAudio.play().catch(e => console.log("Winner audio blocked:", e));
    }
    
    // 1. Switch to Scene 13
    els.s12.classList.remove("active");
    els.s13.classList.add("active");
    els.scamFeedback.classList.add("hidden");

    // Ensure the bubble and button are hidden when the scene first starts
    if (els.endingSpeechBubble) els.endingSpeechBubble.classList.add("hidden");
    els.sailHomeBtn.classList.add("hidden");

    // 2. THE 2-SECOND DELAY
    setTimeout(() => {
        // Show the bubble with a fade effect
        if (els.endingSpeechBubble) {
            els.endingSpeechBubble.classList.remove("hidden");
            els.endingSpeechBubble.classList.add("fade-in-bubble"); // Make sure this class is in your CSS!
        }

        // 3. Start Sailor Duck's Final Speech
        const finalLines = "Well done, explorer. You’ve come a long way! You’ve learned how generative AI can help, and how it can harm when misused. Carry these lessons with you beyond these shores.<br><br>Your boat is ready. It's time to head home!";
        
        let i = 0;
        els.endingSpeech.innerHTML = "";
        
        function typeEnding() {
            if (i < finalLines.length) {
                if (finalLines.substring(i, i+4) === "<br>") {
                    els.endingSpeech.innerHTML += "<br>";
                    i += 4;
                } else {
                    els.endingSpeech.innerHTML += finalLines.charAt(i);
                    i++;
                }
                setTimeout(typeEnding, 30);
            } else {
                // Show the button only AFTER typing is done
                els.sailHomeBtn.classList.remove("hidden");
            }
        }
        
        typeEnding();

    }, 2000); // <--- 2000ms = 2 seconds
});

// 3. Move to Reward Screen
els.sailHomeBtn.addEventListener("click", () => {
    els.s13.classList.remove("active");
    els.s14.classList.add("active");
});

// 4. Play Again (Actual Reload)
els.playAgainBtn.addEventListener("click", () => {
    location.reload();
});

