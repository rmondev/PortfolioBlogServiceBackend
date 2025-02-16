import { Model, DataTypes } from "sequelize";
import sequelize from "./index"; // Ensure this points to the correct file

class Post extends Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public category!: string;
  public date!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize, // ✅ Ensure this is imported correctly
    tableName: "posts",
  }
);

export default Post;
