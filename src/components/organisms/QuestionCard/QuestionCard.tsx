import React from "react";

import styles from "./QuestionCard.module.scss";

import cn from "clsx";
import axios from "axios";
import { QuestionCardProps } from "./QuestionCard.props";

import { deleteQuestion } from "helpers/api-requests";
import { ButtonIcon, Code, Divider } from "components";


export const QuestionCard = ({
  question,
  updateQuestions,
  handleEditButton,
  withEdit = false,
}: QuestionCardProps): JSX.Element => {
  // const [count, setCount] = React.useState<number>(question.count);
  // const debouncedCount = useDebounce<number>(count, 500);

  const handleDeleteButton = async () => {
    await deleteQuestion(question.id.toString());
    await updateQuestions();
  };

  // const patchquestion = async () => {
  //   const payload = {
  //     ...question,
  //     count,
  //   };

  //   try {
  //     const result = await axios.patch(PATCH_question_URL + question.id, payload, {
  //       withCredentials: true,
  //     });
  //     updateQuestions();
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // React.useEffect(() => {
  //   setCount(question.count);
  // }, [question.count]);

  // React.useEffect(() => {
  //   (async function () {
  //     if (count !== question.count) {
  //       patchItem();
  //     }
  //   })();
  // }, [debouncedCount]);

  return (
    <div className={styles.wrapper}>
      {withEdit && (
        <div className={styles.changeQuestionButton}>
          <ButtonIcon
            icon="edit"
            appearance="white"
            onClick={handleEditButton}
          ></ButtonIcon>

          <ButtonIcon
            icon="deleteIcon"
            appearance="white"
            onClick={handleDeleteButton}
          ></ButtonIcon>
        </div>
      )}

      <div className={styles.questionCard}>
        <div className={styles.question}>
          <h4 >{question.question}</h4>
          <Divider className={styles.divider} />
        </div>

        <div className={styles.codeExample}>
          <Code codeExample={question.codeExample} />
        </div>
      </div>
    </div>
  );
};
