import { Button, Input, Link } from "~/libs/components/components.js";
import { AppRoute, AppTitle } from "~/libs/enums/enums.js";
import { useAppForm, useAppTitle, useCallback } from "~/libs/hooks/hooks.js";
import {
	type AuthForgotPasswordRequestDto,
	authForgotPasswordValidationSchema,
} from "~/modules/auth/auth.js";

import { DEFAULT_AUTH_FORGOT_PASSWORD_IN_PAYLOAD } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: AuthForgotPasswordRequestDto) => void;
};

const ForgotPasswordForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<AuthForgotPasswordRequestDto>({
			defaultValues: DEFAULT_AUTH_FORGOT_PASSWORD_IN_PAYLOAD,
			validationSchema: authForgotPasswordValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	useAppTitle(AppTitle.FORGOT_PASSWORD);

	return (
		<form className={styles["content"]} onSubmit={handleFormSubmit}>
			<div className={styles["info"]}>
				<h2 className={styles["title"]}>Forgot password</h2>
				<p className={styles["subtitle"]}>
					Do you remember it? Go to{" "}
					<Link className={styles["link"]} to={AppRoute.SIGN_IN}>
						Log in
					</Link>
				</p>
				<p className={styles["subtitle"]}>
					No account? Go to{" "}
					<Link className={styles["link"]} to={AppRoute.SIGN_UP}>
						Create an account
					</Link>
				</p>
			</div>
			<Input
				control={control}
				errors={errors}
				inputMode="email"
				label="Email"
				name="email"
				placeholder="email@example.com"
				type="text"
			/>
			<Button
				className={styles["button"]}
				label="Send a recovery link"
				type="submit"
			/>
		</form>
	);
};

export { ForgotPasswordForm };
