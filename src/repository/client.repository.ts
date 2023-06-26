import { injectable } from 'inversify';
import { GenericRepositoryImp } from './repository';
import { dataSource } from '../config/db';
import { Repository } from 'typeorm';
import { Client, GenderType, IdentificationType } from '../entity/client.entity';

@injectable()
export class ClientRepository extends GenericRepositoryImp<Client> {

    private clientRepository: Repository<Client>;

    constructor() {
        const repository = dataSource.getRepository(Client);
        super(repository);
        this.clientRepository = repository;
    }

    private convertToEntity(data: any) {
        const client: Client = new Client();
        client.identification = data.identificacion;
        client.identificationType = data.tipoIdentificacion;
        client.name = data.nombre;
        client.gender = data.genero;
        return client;
    }

    public async insertClient(client: Client): Promise<void> {
        return await this.clientRepository.query(`
            EXEC InsertarCliente
            @tipoIdentificacion = '${client.identificationType}',
            @identificacion = '${client.identification}',
            @nombre = '${client.name}',
            @genero = '${client.gender}'
        `);
    }

    public async getClients(): Promise<Client[]> {
        return await this.clientRepository.find();
    }

    public async getClient(identification: string, identificationType: IdentificationType): Promise<Client> {
        const result = await this.clientRepository.query(`
            EXEC ObtenerCliente
            @tipoIdentificacion = '${identificationType}',
            @identificacion = '${identification}'
        `);
        return result && result.length > 0 ? this.convertToEntity(result[0]) : undefined;
    }

    public async updateClient(client: Client, name: string, gender: GenderType): Promise<void> {
        return await this.clientRepository.query(`
            EXEC ActualizarCliente
            @tipoIdentificacion = '${client.identificationType}',
            @identificacion = '${client.identification}',
            @nombre = '${name}',
            @genero = '${gender}'
        `);
    }

    public async deleteClient(client: Client): Promise<void> {
        return await this.clientRepository.query(`
            EXEC EliminarCliente
            @tipoIdentificacion = '${client.identificationType}',
            @identificacion = '${client.identification}'
        `);
    }

}