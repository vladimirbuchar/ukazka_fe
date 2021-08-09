import { Price } from '../Shared/Price'

export class AddCourse {
  constructor (isPrivateCourse: boolean, userAccessToken: string, name: string, description: string, organizationId: string, defaultMaximumStudents: number,
    defaultMinimumStudents: number, courseImage: string, price: Price, courseStatusId: string, courseTypeId: string, certificateId: string, automaticGenerateCertificate:boolean,
    courseMaterialId: string, sendEmail:boolean, emailTemplateId:string,courseWithLector:boolean) {
    this.isPrivateCourse = isPrivateCourse
    this.userAccessToken = userAccessToken
    this.name = name
    this.description = description
    this.organizationId = organizationId
    this.defaultMaximumStudents = Number(defaultMaximumStudents)
    this.defaultMinimumStudents = Number(defaultMinimumStudents)
    this.courseImage = courseImage
    this.price = price
    this.courseStatusId = courseStatusId
    this.courseTypeId = courseTypeId
    this.certificateId = certificateId
    this.automaticGenerateCertificate = automaticGenerateCertificate
    this.courseMaterialId = courseMaterialId
    this.sendEmail = sendEmail
    this.emailTemplateId = emailTemplateId
    this.courseWithLector = courseWithLector;
  }

    public isPrivateCourse: boolean;
    public userAccessToken: string;
    public name: string;
    public description: string;
    public organizationId: string;
    public defaultMaximumStudents: number;
    public defaultMinimumStudents: number;
    public courseImage: string;
    public price: Price;
    public courseStatusId: string;
    public courseTypeId: string;
    public certificateId: string;
    public automaticGenerateCertificate: boolean;
    public courseMaterialId: string;
    public sendEmail:boolean;
    public emailTemplateId:string;
    public courseWithLector: boolean;
}
