import React from 'react';
import { Test } from 'components';
import { withLayout } from 'layouts';
import { GetServerSideProps } from 'next';
import { useQuestions, useSessionStorage } from 'hooks';
import { categoryName, questionsInStorageName } from 'constants/names.storage';
import { getQueryParametr } from 'helpers/get-param-from-query';
import { Spinner } from 'react-bootstrap';
import { IQuestion } from 'interfaces/questions.interface';
import { useQuestionsApi } from 'hooks/questions/useQuestionsApi';
import { getRandomQuestionsUrl } from 'helpers/get-questions-url';

interface ITestPageProps extends Record<string, unknown> {
	category: string;
	questionsAmount: number;
}

export const getServerSideProps: GetServerSideProps<ITestPageProps> = async (
	context
) => {
	const questionsAmount =
		Number(getQueryParametr(context, 'questionsAmount')) || 1;

		const category = getQueryParametr(context, 'category') || 'javascript';

	return { props: { category, questionsAmount } };
};


const TestPage = ({
	category,
	questionsAmount,
}: ITestPageProps): JSX.Element => {

	const { api } = useQuestionsApi();
	const [questions, setQuestions] = React.useState<IQuestion[] | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const [_, setCategoryInStorage] = useSessionStorage(
		categoryName,
		category
	);

	React.useEffect(() => {
		setCategoryInStorage(category);
	}, [category])

	// Save questions in storage to get them in TestResult page.
	const [__, setQuestionsInStorage] = useSessionStorage(
		questionsInStorageName,
		[]
	);

	React.useEffect(() => {
		const questionsUrl = getRandomQuestionsUrl({
			category,
			limit: questionsAmount > 1 ? questionsAmount : 5,
		});

		// setIsLoading(true);
		api.getQuestions(questionsUrl).then(data => {
			setQuestions(data);
			if (data) {
				//@ts-ignore
				setQuestionsInStorage(data);
			}
		});
	}, []);

	// React.useEffect(() => {
	// 	//@ts-ignore
	// 	setQuestionsInStorage(questions);
	// }, [questions.length]);

	if (isLoading) {
		return (
			<Spinner
				as="span"
				animation="border"
				size="sm"
				role="status"
				aria-hidden="true" />);
	}

	return (
		<>
			{questions && questions.length && (
				<Test questions={questions} />
			)}
		</>
	);
};

export default withLayout('main', TestPage);
