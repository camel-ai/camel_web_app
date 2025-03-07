export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type HTTPValidationError = {
	detail?: Array<ValidationError>;
};



export type Message = {
  message: string
}


export type Task = {
  /**
   * The ID of the task.
   */
  task_id: string;
  /**
   * The status of the task.
   */
  status: string;
  /**
   * The result of the task.
   */
  result?: unknown | null;
  /**
   * The error message if the task fails.
   */
  error?: string | null;
  /**
   * The progress of the task.
   */
  progress?: TaskProgress | null;
};


/**
 * Create a task, including the number of subtasks and the duration of each subtask.
 */
export type TaskCreate = {
  /**
   * The number of subtasks.
   */
  subtasks?: number;
  /**
   * The duration of each subtask.
   */
  duration?: number;
};


export type TaskProgress = {
  /**
   * The ID of the user.
   */
  user_id: string;
  /**
   * The current progress.
   */
  current?: number;
  /**
   * The total progress.
   */
  total?: number;
  /**
   * The percentage of the progress.
   */
  percentage?: number;
};


export type Tasks = {
  /**
   * A list of tasks.
   */
  data?: Array<Task>;
  /**
   * The number of tasks.
   */
  count?: number;
};


export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
