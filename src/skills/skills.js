//import {Utils} from "./utils";

const skills = document.getElementById("skills");
let skillStorage = [];

class Skill {

    static #DOMParser = new DOMParser();
    static #skillNameInput = document.querySelector(".skills__header__form__name");
    static #skillRatioInput = document.querySelector(".skills__header__form__ratio");

    #skillName;
    #skillRatio;

    constructor(skillName, skillRatio) {
        this.#skillName = skillName;
        this.#skillRatio = skillRatio;
        new RegExp()
    }

    render(skillIndex, skillRatio) {
        const skill = document.createElement("div");
        skill.id = "skills__" + skillIndex;
        if (skillStorage.length === 0)
            skill.style.margin = "-8% 0 0 12%";
        else
            skill.style.margin = "2% 0 0 12%";

        this.#renderSkillHeader(skill);
        Skill.#renderSkillProgressSlider(skill, skillRatio);
        Skill.#renderDeleteSkillBtn(skill);

        skills.appendChild(skill);
    }

    #renderSkillHeader(skill) {
        let skillHeaderHTML = Skill.#getSkillHeaderHTML(skill.id, this.#skillName, this.#skillRatio);
        let skillHeader = Skill.#getNodeFromString(skillHeaderHTML);
        skill.appendChild(skillHeader);
    }

    static #getSkillHeaderHTML(skillID, skillName, skillRatio) {
        return `
          <div style="display: flex; justify-content: space-between; flex-direction: row; width: 30%; font-size: 1.3em;">
            <span>${skillName}</span>
            <span id="${skillID}__ratio">${skillRatio}%</span>
          </div>
        `;
    }

    static #renderSkillProgressSlider(skill, skillRatio) {
        let skillProgressSliderHTML = Skill.#getSkillProgressSliderHTML(skill.id, skillRatio);
        let skillProgressSlider = Skill.#getNodeFromString(skillProgressSliderHTML);
        skill.appendChild(skillProgressSlider);
        renderSlider(skillProgressSlider, skill.id);
    }

    static #getSkillProgressSliderHTML(skillID, skillRatio) {
        return `
          <input type="range" id="${skillID}__slider" class="${skillID}__slider styled-slider slider-progress"
            value="${skillRatio}" style="width: 30%; background: black">
        `;
    }

    static #renderDeleteSkillBtn(skill) {
        let deleteSkillBtnHTML = Skill.#getDeleteSkillBtnHTML(skill);
        let deleteSkillBtn = Skill.#getNodeFromString(deleteSkillBtnHTML);
        deleteSkillBtn.onclick = function() {removeSkill(skill.id)};
        skill.appendChild(deleteSkillBtn);
    }

    static #getDeleteSkillBtnHTML(skill) {
        return `
            <input type="image" src="src/skills/rubbish-bin.svg" class="${skill.id}__delete-skill"
              style="width: 30px; cursor: pointer; margin-bottom: -0.6%;" alt="skill delete button">
        `;
    }

    static #getNodeFromString(str) {
        return Skill.#DOMParser.parseFromString(str, "text/html").documentElement.childNodes[1].firstChild;
    }

    static readSkill(skill) {
        skill.skillName = this.#readSkillName();
        skill.skillRatio = this.#readSkillRatio();
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

        skillName = replaceAll(skillName, "<", "&lt");
        skillName = replaceAll(skillName, ">", "&gt");

        //Utils.validateSkillNameInput(skillName);
        Skill.#skillNameInput.value = "";
        return skillName;
    }

    static #readSkillRatio() {
        let skillRatio = Number.parseInt(Skill.#skillRatioInput.value);
        const minSkillRatio = Number.parseInt(Skill.#skillRatioInput.min);
        const maxSkillRatio = Number.parseInt(Skill.#skillRatioInput.max);

        if (isNaN(skillRatio)) {
            alert("Skills ratio was incorrect entered. Try again");
            skillRatio = undefined;
        } else if (skillRatio < minSkillRatio) {
            skillRatio = minSkillRatio;
        } else if (skillRatio > maxSkillRatio) {
            skillRatio = maxSkillRatio;
        }

        Skill.#skillRatioInput.value = "";
        return skillRatio;
    }

    get skillName() {
        return this.#skillName;
    }

    set skillName(skillName) {
        this.#skillName = skillName;
    }

    get skillRatio() {
        return this.#skillRatio;
    }

    set skillRatio(skillRatio) {
        this.#skillRatio = skillRatio;
    }

}

let isPlugRendered = false;
const plugDescription = `
      <style>
          #skills__plug {
            margin: 0 0 0 10%;
            font-size: 2em;
          }
      </style>
      There are no skills here yet.
`;

function addSkill() {
    let skill = new Skill(null, null);
    Skill.readSkill(skill);
    if (skill.skillRatio === undefined || skill.skillName === undefined)
        return;
    if (isPlugRendered)
        erasePlug();
    skill.render(skillStorage.length, skill.skillRatio);
    skillStorage.splice(skillStorage.length, 0, skill);
}

function removeSkill(skillID) {
    let skillOrdinal = Number.parseInt(skillID.substring(8), 10);
    let removedSkill = document.getElementById(skillID);
    skills.removeChild(removedSkill);
    skillStorage.splice(skillOrdinal, 1);
    if (skillStorage.length === 0)
        renderPlug();
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

function onAddSkill(event) {
    event.preventDefault();
    addSkill();
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

document.getElementById("skills__header__form").addEventListener("submit", onAddSkill);
renderPlug();
