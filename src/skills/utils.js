export class Utils {

    static validateSkillNameInput(skillName) {
        skillName.replaceAll("<", "&lt");
        skillName.replaceAll(">", "&gt");
    }

}
