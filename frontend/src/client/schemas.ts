export const $Body_login_login_access_token = {
  properties: {
    grant_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
    },
    username: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    scope: {
      type: "string",
      default: "",
    },
    client_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    client_secret: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const

export const $Message = {
  properties: {
    message: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $Task = {
  properties: {
    task_id: {
      type: "string",
      description: `The ID of the task.`,
      isRequired: true,
    },
    status: {
      description: `The status of the task.`,
      properties: {},
    },
    result: {
      type: "any-of",
      description: `The result of the task.`,
      contains: [
        {
          properties: {},
        }, {
          type: "null",
        },
      ],
    },
    error: {
      type: "any-of",
      description: `The error message if the task fails.`,
      contains: [
        {
          type: "string",
        }, {
          type: "null",
        },
      ],
    },
    progress: {
      type: "any-of",
      description: `The progress of the task.`,
      contains: [
        {
          type: "TaskProgress",
        }, {
          type: "null",
        },
      ],
    },
  },
} as const

export const $TaskCreate = {
  description: `Create a task, including the number of subtasks and the duration of each subtask.`,
  properties: {
    subtasks: {
      type: "number",
      description: `The number of subtasks.`,
      default: 2,
    },
    duration: {
      type: "number",
      description: `The duration of each subtask.`,
      default: 5,
    },
  },
} as const

export const $TaskProgress = {
  properties: {
    user_id: {
      type: "string",
      description: `The ID of the user.`,
      isRequired: true,
    },
    current: {
      type: "number",
      description: `The current progress.`,
      default: 0,
    },
    total: {
      type: "number",
      description: `The total progress.`,
      default: 1,
    },
    percentage: {
      type: "number",
      description: `The percentage of the progress.`,
      default: 0,
    },
  },
} as const

export const $Tasks = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "Task",
      },
      default: [],
    },
    count: {
      type: "number",
      description: `The number of tasks.`,
      default: 0,
    },
  },
} as const

export const $Token = {
  properties: {
    access_token: {
      type: "string",
      isRequired: true,
    },
    token_type: {
      type: "string",
      default: "bearer",
    },
  },
} as const

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    new_password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
  },
} as const

export const $UserPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "string",
      isRequired: true,
      format: "uuid",
    },
  },
} as const

export const $UserRegister = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      isRequired: true,
      maxLength: 40,
      minLength: 8,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdate = {
  properties: {
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 40,
          minLength: 8,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
          format: "email",
          maxLength: 255,
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UsersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "UserPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const
