import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum IdentificationType {
    CC = 'Cédula Ciudadania',
    NIT = 'NIT',
    CE = 'Cédula Extranjeria'
}

export enum GenderType {
    MEN = 'Masculino',
    WOMEN = 'Femenino',
    OTHER = 'Otro'
}

@Entity('Clientes')
export class Client {

    @PrimaryColumn({
        type: 'varchar',
        name: 'identificacion',
        length: 20,
        unique: true,
        nullable: false
    })
    public identification: string;

    @Column({
        type: 'varchar',
        enum: IdentificationType,
        name: 'tipoIdentificacion',
        length: 20,
        nullable: false
    })
    public identificationType: IdentificationType;

    @Column({
        type: 'varchar',
        name: 'nombre',
        length: 50,
        nullable: false
    })
    public name: string;

    @Column({
        type: 'varchar',
        enum: GenderType,
        name: 'genero',
        length: 10,
        nullable: false
    })
    public gender: GenderType;

}