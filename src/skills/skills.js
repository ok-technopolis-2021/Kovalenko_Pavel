const skills = document.getElementById("skills");

class Skill {

    #skillName;
    #skillRatio;
    static #skillNameInput = document.getElementsByClassName("skills__header__form__skill-name-input")[0];
    static #skillRatioInput = document.getElementsByClassName("skills__header__form__skill-ratio-input")[0];

    constructor(skillName, skillRatio) {
        this.#skillName = skillName;
        this.#skillRatio = skillRatio;
    }

    render(skillIndex, skillRatio) {
        const skill = document.createElement("div");
        skill.id = "skills__" + skillIndex;
        skill.style.margin = "2% 0 0 12%";

        this.#renderSkillHeader(skill);
        Skill.#renderSkillProgressSlider(skill, skillRatio);
        Skill.#renderDeleteSkillBtn(skill);
        skills.appendChild(skill);
    }

    #renderSkillHeader(skill) {
        const skillHeader = document.createElement("div");
        skillHeader.style.display = "flex";
        skillHeader.style.width = "30%";
        skillHeader.style.justifyContent = "space-between";
        skillHeader.style.flexDirection = "row";
        skillHeader.style.fontSize = "1.3em";
        skillHeader.innerHTML = Skill.#getSkillHeaderInnerHtml(skill.id, this.#skillName, this.#skillRatio);
        skill.appendChild(skillHeader);
    }

    static #getSkillHeaderInnerHtml(skillID, skillName, skillRatio) {
        return `<span style="align-self: flex-start">${skillName}</span>
          <span id="${skillID}__ratio" style="align-self: flex-end">${skillRatio}%</span>`;
    }

    static #renderSkillProgressSlider(skill, skillRatio) {
        const skillProgress = document.createElement("input");
        skillProgress.type = "range";
        skillProgress.style.width = "30%";
        skillProgress.id = skill.id + "__slider";
        skillProgress.className = skillProgress.id + " styled-slider slider-progress";
        skillProgress.style.background = "black";
        skillProgress.value = skillRatio;
        skill.appendChild(skillProgress);
        renderSlider(skillProgress, skill.id);
    }

    static #renderDeleteSkillBtn(skill) {
        const deleteSkillButton = document.createElement("input");
        deleteSkillButton.type = "image";
        deleteSkillButton.onclick = function() {removeSkill(skill.id)};
        deleteSkillButton.src = "rubbish-bin.svg";
        deleteSkillButton.style.width = "30px";
        deleteSkillButton.alt = "skill delete button";
        deleteSkillButton.style.cursor = "pointer";
        deleteSkillButton.className = `${skill.id}__delete-skill`;
        deleteSkillButton.style.margin = "0 0 -0.6% 0";
        skill.appendChild(deleteSkillButton);
    }

    get skillRatio() {
        return this.#skillRatio;
    }

    static readSkill() {
        let skillName = this.#readSkillName();
        let skillRatio = this.#readSkillRatio();
        if (skillName === undefined || skillRatio === undefined)
            return undefined;
        return new Skill(skillName, skillRatio);
    }

    static #readSkillName() {
        let skillName = Skill.#skillNameInput.value;
        if (skillName.length === 0) {
            alert("Skills name wasn't entered. Try again");
            return undefined;
        }
        if (skillName.length > Skill.#skillNameInput.size) {
            skillName = skillName.substring(0, Skill.#skillNameInput.size);
            alert("Skills name is very long. It will be shortened to " + skillName);
        }
        skillName.replaceAll("<", "&lt");
        skillName.replaceAll(">", "&gt");
        Skill.#skillNameInput.value = "";
        return skillName;
    }

    static #readSkillRatio() {
        let skillRatio = Number.parseInt(Skill.#skillRatioInput.value);
        let minSkillRatio = Number.parseInt(Skill.#skillRatioInput.min);
        let maxSkillRatio = Number.parseInt(Skill.#skillRatioInput.max);
        if (isNaN(skillRatio) || skillRatio < minSkillRatio || skillRatio > maxSkillRatio) {
            alert("Skills ratio was incorrect entered. Try again");
            skillRatio = undefined;

        }
        Skill.#skillRatioInput.value = "";
        return skillRatio;
    }

}

let skillStorage = [];
let isPlugRendered = false;
const plugDescription = `
      <style>
          #skills__plug {
            margin: 5% 0 0 10%;
            font-size: 2em;
          }
      </style>
      There are no skills here yet.
`;

function addSkill() {
    let skill = Skill.readSkill();
    if (skill === undefined) {
        return;
    }
    if (isPlugRendered) {
        erasePlug();
    }
    skill.render(skillStorage.length, skill.skillRatio);
    skillStorage.splice(skillStorage.length, 0, skill);
}

function removeSkill(skillID) {
    let skillOrdinal = Number.parseInt(skillID.substring(8), 10);
    let removedSkill = document.getElementById(skillID);
    skills.removeChild(removedSkill);
    skillStorage.splice(skillOrdinal, 1);
    if (skillStorage.length === 0) {
        renderPlug();
    }
}

function renderPlug() {
    let plug = document.createElement("div");
    plug.id = "skills__plug";
    plug.innerHTML = plugDescription;
    skills.appendChild(plug);
    isPlugRendered = true;
}

function erasePlug() {
    let plug = document.getElementById("skills__plug");
    skills.removeChild(plug);
    isPlugRendered = false;
}

document.getElementById("skills__header__add-skill-wrap")
    .addEventListener("click", addSkill);

renderPlug();
