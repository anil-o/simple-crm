export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    address: string;
    zipCode: number;
    city: string;

    //Question mark means that you can optionally enter the object
    //That means that you can also build a user without these attributes or objects.
    //The object is either defined with the corresponding attribute or empty (is a faster form of if/else request)
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.address = obj ? obj.address : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            address: this.address,
            zipCode: this.zipCode,
            city: this.city
        }
    }
}