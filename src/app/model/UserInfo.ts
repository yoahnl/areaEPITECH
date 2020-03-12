export interface UserInfo {
    username: string;
    email: string;
    password: string;
}

export enum PromptActionLabelLogin {
    login = 'Login',
    register = 'Create an account'
}

export enum PromptActionButtonTitle {
    login = 'Don\'t have an account? Sign up',
    register = 'Back to login'
}
