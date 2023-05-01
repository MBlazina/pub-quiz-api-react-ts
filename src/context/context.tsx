import { QuizDto } from "@/dto/QuizDto";
import { useContext } from "react";

const Context = useContext<QuizDto | null>(null);
