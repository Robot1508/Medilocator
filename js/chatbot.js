/* ==============================
   CHATBOT BACKEND (chatbot.js)
   ============================== */

class ChatbotEngine {
    constructor() {
        this.responses = [
            { keywords: ["heart", "chest pain", "cardiac", "stroke"], response: "Filtering nearby options for Cardiac facilities.", filter: "Cardiac" },
            { keywords: ["accident", "bleeding", "trauma", "crash"], response: "Filtering for Trauma centers.", filter: "Trauma" },
            { keywords: ["baby", "pregnancy", "maternity", "labor"], response: "Filtering for Maternity and NICU facilities.", filter: "Maternity" },
            { keywords: ["clear", "reset"], response: "Resetting view to all hospitals.", filter: "" }
        ];
    }
    
    init() {
        document.getElementById("openChatbot").addEventListener("click", () => {
            const p = document.getElementById("chatbotPanel");
            p.style.display = p.style.display === "flex" ? "none" : "flex";
        });
        document.getElementById("closeChatbot").addEventListener("click", () => document.getElementById("chatbotPanel").style.display = "none");
        document.getElementById("chatSend").addEventListener("click", () => this.processInput());
        document.getElementById("chatInput").addEventListener("keypress", (e) => { if(e.key === 'Enter') this.processInput(); });
    }
    
    processInput() {
        let val = document.getElementById("chatInput").value.trim();
        if(!val) return;
        this.appendMessage("You", val);
        document.getElementById("chatInput").value = "";
        
        setTimeout(() => {
            const msg = val.toLowerCase();
            let match = this.responses.find(r => r.keywords.some(k => msg.includes(k)));
            
            if(match) {
                this.appendMessage("MediBot", match.response);
                if (window.applyExternalFilter) window.applyExternalFilter(match.filter);
            } else if (msg.includes("nearest") || msg.includes("emergency")) {
                this.appendMessage("MediBot", "Routing to the nearest ICU...");
                document.getElementById("btnEmergency").click();
            } else {
                this.appendMessage("MediBot", "I can help route you or filter features. Emergency? Tap the Red Button on the list!");
            }
        }, 600);
    }
    
    appendMessage(sender, text) {
        let div = document.createElement("div");
        div.style.marginBottom = "8px";
        div.style.textAlign = sender === "You" ? "right" : "left";
        div.innerHTML = `<span class="badge ${sender === 'You' ? 'bg-primary' : 'bg-light text-dark border'} text-wrap text-start" style="font-size:14px; max-width: 90%; white-space: normal;">${text}</span>`;
        let b = document.getElementById("chatBody");
        b.appendChild(div);
        b.scrollTop = b.scrollHeight;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.chatbot = new ChatbotEngine();
    window.chatbot.init();
});
