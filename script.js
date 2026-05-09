const ART_DB = [
      { title: "Starry Night", style: "Post‑Impressionism", mood: "Calm" },
      { title: "The Kiss", style: "Symbolism", mood: "Romantic" },
      { title: "Digital Dreams", style: "Digital Art", mood: "Futuristic" },
      { title: "Neon Streets", style: "Cyberpunk", mood: "Energetic" },
      { title: "Forest Whisper", style: "Watercolor", mood: "Peaceful" },
      { title: "Abstract Chaos", style: "Abstract", mood: "Intense" },
      { title: "Golden Savanna", style: "Photography", mood: "Warm" },
      { title: "Minimal Waves", style: "Minimalism", mood: "Calm" },
      { title: "Graffiti Pulse", style: "Street Art", mood: "Bold" },
      { title: "Clay Stories", style: "Ceramics", mood: "Earthy" }
    ];

    const styleTags = document.getElementById("styleTags");
    const moodTags = document.getElementById("moodTags");
    const results = document.getElementById("results");
    const searchInput = document.getElementById("search");
    const empty = document.getElementById("empty");

    const selectedStyles = new Set();
    const selectedMoods = new Set();

    function createTags(values, container, set) {
      values.forEach(v => {
        const btn = document.createElement("button");
        btn.textContent = v;
        btn.className = "tag";
        btn.onclick = () => {
          if (set.has(v)) {
            set.delete(v);
            btn.classList.remove("active");
          } else {
            set.add(v);
            btn.classList.add("active");
          }
          render();
        };
        container.appendChild(btn);
      });
    }

    function render() {
      const query = searchInput.value.toLowerCase();

      const filtered = ART_DB.filter(a => {
        const styleMatch = selectedStyles.size === 0 || selectedStyles.has(a.style);
        const moodMatch = selectedMoods.size === 0 || selectedMoods.has(a.mood);
        const searchMatch = a.title.toLowerCase().includes(query);
        return styleMatch && moodMatch && searchMatch;
      });

      results.innerHTML = "";

      if (filtered.length === 0) {
        empty.style.display = "block";
        return;
      }

      empty.style.display = "none";

      filtered.forEach(a => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div class="title">${a.title}</div>
          <div>Style: ${a.style}</div>
          <div>Mood: ${a.mood}</div>
        `;
        results.appendChild(card);
      });
    }

    const styles = [...new Set(ART_DB.map(a => a.style))];
    const moods = [...new Set(ART_DB.map(a => a.mood))];

    createTags(styles, styleTags, selectedStyles);
    createTags(moods, moodTags, selectedMoods);

    searchInput.addEventListener("input", render);

    render();