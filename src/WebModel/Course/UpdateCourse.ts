import { Price } from '../Shared/Price'

export class UpdateCourse {
  constructor (id: string, isPrivateCourse: boolean, userAccessToken: string, name: string, description: string, defaultMaximumStudents: number,
    defaultMinimumStudents: number, courseImage: string, price: Price, courseStatusId: string, courseTypeId: string, certificateId: string, automaticGenerateCertificate: boolean,
    courseMaterialId: string, sendEmail:boolean, emailTemplateId:string,courseWithLector: boolean) {
    this.isPrivateCourse = isPrivateCourse
    this.userAccessToken = userAccessToken
    this.name = name
    this.description = description
    this.defaultMaximumStudents = Number(defaultMaximumStudents)
    this.defaultMinimumStudents = Number(defaultMinimumStudents)
    this.courseImage = courseImage
    this.price = price
    this.courseStatusId = courseStatusId
    this.courseTypeId = courseTypeId
    this.Id = id
    this.certificateId = certificateId
    this.automaticGenerateCertificate = automaticGenerateCertificate
    this.courseMaterialId = courseMaterialId
    this.sendEmail = sendEmail
    this.emailTemplateId = emailTemplateId

    this.courseWithLector = courseWithLector;
  }

    public Id: string;
    public isPrivateCourse: boolean;
    public userAccessToken: string;
    public name: string;
    public description: string;
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
