import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})


//    Especially ensure: in tesconfig.ts

    // "experimentalDecorators": true ✅

    // "emitDecoratorMetadata": true ✅ 

class User extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id?: string

    @Column({
        type: DataType.STRING,
         allowNull: false
    
    })
    declare username: string

    @Column ({
        type: DataType.STRING,
         allowNull: false,
    })
    declare password:string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    declare email:string
  

}

export default User