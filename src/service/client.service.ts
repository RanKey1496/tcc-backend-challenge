import { inject, injectable } from 'inversify';
import Types from '../config/types';
import { Client, GenderType, IdentificationType } from '../entity/client.entity';
import { ClientRepository } from '../repository/client.repository';
import { BadRequest, Conflict, NotFound } from '../util/exceptions';

export interface ClientService {
    getAll(): Promise<Client[]>;
    getByIdentificationAndType(identification: string, identificationType: IdentificationType): Promise<Client>;
    save(identification: string, identificationType: any, name: string, gender: any): Promise<void>;
    update(client: Client, name: string, gender: any): Promise<void>;
    delete(client: Client): Promise<void>;
    validateClientDoesntExists(identification: string, identificationType: any): Promise<void>;
}

@injectable()
export class ClientServiceImpl implements ClientService {

    @inject(Types.ClientRepository)
    private clientRepository: ClientRepository;

    public async getAll(): Promise<Client[]> {
        return await this.clientRepository.getClients();
    }

    public async getByIdentificationAndType(identification: string, identificationType: IdentificationType): Promise<Client> {
        const result = await this.clientRepository.getClient(identification, identificationType);
        if (!result) {
            throw new NotFound('No se ha encontrado el cliente');
        }
        return result;
    }

    public async save(identification: string, identificationType: IdentificationType, name: string, gender: GenderType): Promise<void> {
        const client: Client = new Client();
        client.identification = identification;
        client.identificationType = identificationType;
        client.name = name;
        client.gender = gender;
        await this.clientRepository.insertClient(client);
    }

    public async update(client: Client, name: string, gender: GenderType): Promise<void> {
        return await this.clientRepository.updateClient(client, name, gender);
    }

    public async delete(client: Client): Promise<void> {
        return await this.clientRepository.deleteClient(client);
    }

    async validateClientDoesntExists(identification: string, identificationType: any): Promise<void> {
        const result = await this.clientRepository.getClient(identification, identificationType);
        if (result) {
            throw new Conflict('El cliente ya existe');
        }
    }
}