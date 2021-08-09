export default class OrganizationPermition {
    public isCourseAdministrator?: boolean
    public isCourseEditor?: boolean
    public isLector?: boolean
    public isOrganizationAdministrator?: boolean
    public isOrganizationOwner?: boolean
    public isStudent?: boolean
    constructor (isCourseAdministrator?: boolean, isCourseEditor?: boolean, isLector?: boolean, isOrganizationAdministrator?: boolean, isOrganizationOwner?: boolean, isStudent?: boolean) {
      this.isCourseAdministrator = isCourseAdministrator
      this.isCourseEditor = isCourseEditor
      this.isLector = isLector
      this.isOrganizationAdministrator = isOrganizationAdministrator
      this.isOrganizationOwner = isOrganizationOwner
      this.isStudent = isStudent
    }
}
