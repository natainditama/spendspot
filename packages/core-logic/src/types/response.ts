export type BaseResponse = {
  success?: boolean;
  message?: string;
};

export type SuccessResponse<T = unknown> = {
  data?: T;
} & BaseResponse;

export type ErrorResponse = {
  errors?: Record<string, unknown>;
  stack?: unknown;
} & BaseResponse;

export type ServiceResponse<T = unknown> = {
  data?: T;
  errors?: Record<string, unknown>;
  stack?: unknown;
} & BaseResponse;
