import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
  Query,
  Ctx,
} from "type-graphql";
import { Post, User } from "../../../prisma/generated/type-graphql";
import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import prisma from "../../../lib/prisma";
import { AuthGuard } from "../middleware/authGuard";
import { Role } from "@prisma/client";
import { GraphQLContext } from "../middleware/auth.types";

// Define an Input Type for user creation
@InputType()
class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

// Define an Input Type for user login
@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// Define an Object Type for login response
@ObjectType()
class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@InputType()
class CreatePostInput {
  @Field()
  content: string;
}

// Resolver for user-related operations
@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async registerUser(@Arg("input") data: RegisterUserInput): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new GraphQLError("Cannot Register With This Email");
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      // Create the user
      return prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: Role.USER,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new GraphQLError(
        error instanceof Error ? error.message : "Failed to create user"
      );
    }
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("input") { email, password }: LoginInput
  ): Promise<LoginResponse> {
    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      const validPassword = await bcrypt.compare(password, user.password);

      // If user not found
      if (!user || !validPassword) {
        throw new GraphQLError("Please Check Credentials");
      }

      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET || "01JRA9P0477E27WJ5Y05F093B1";
      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "999d" }
      );

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        password: undefined,
      };

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new GraphQLError(
        error instanceof Error ? error.message : "Login Failed"
      );
    }
  }

  @Mutation(() => Post)
  @AuthGuard(Role.USER)
  async createPost(
    @Arg("input") data: CreatePostInput,
    @Ctx() { user }: GraphQLContext
  ): Promise<Post> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser) {
        throw new GraphQLError("User Not Found");
      }

      const post = await prisma.post.create({
        data: {
          ...data,
          authorId: user.id,
        },
      });

      return post;
    } catch (e) {
      console.error(e);
      throw new GraphQLError(
        e instanceof Error ? e.message : "Internal Server Error"
      );
    }
  }
  @Query(() => [Post])
  @AuthGuard(Role.USER)
  async myPosts(@Ctx() { user }: GraphQLContext) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser) {
        throw new GraphQLError("User Not Found");
      }

      const posts = await prisma.post.findMany({
        where: {
          authorId: user.id,
        },
      });

      return posts;
    } catch (e) {
      console.error(e);
      throw new GraphQLError(
        e instanceof Error ? e.message : "Internal Server Error"
      );
    }
  }
}
