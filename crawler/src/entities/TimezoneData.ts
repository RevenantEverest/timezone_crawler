import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Unique
} from 'typeorm';

@Entity('timezone_data')
@Unique(['abbreviation', 'name'])
class TimezoneData extends BaseEntity {

    constructor(
        id: number,
        abbreviation: string,
        name: string,
        utc_offset: string
    ) {
        super();
        this.id = id;
        this.abbreviation = abbreviation;
        this.name = name;
        this.utc_offset = utc_offset;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 5 })
    abbreviation: string;

    @Column({ type: "varchar", length: 25 })
    name: string;

    @Column({ type: "varchar", length: 6 })
    utc_offset: string;
};

export default TimezoneData;