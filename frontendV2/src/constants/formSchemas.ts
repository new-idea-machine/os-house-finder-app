import * as z from 'zod';

export const profileFormSchema = z
  .object({
    profileName: z
      .string()
      .min(1, {
        message: 'Profile name must be at least 1 character.',
      })
      .max(100, {
        message: 'Profile name must be at most 100 character.',
      }),
    squareFootageWeight: z // Square Footage Input
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      })
      .default(0),
    squareFootageMin: z.number().min(1, {
      message: 'Weight must be at least 1.',
    }),
    squareFootageMax: z
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      }),
    bedroomWeight: z // Bedroom Input
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      })
      .default(0),
    bedroomAmount: z
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      })
      .default(0),
    travelRequirementWeight: z // Travel Requirement Input
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      })
      .default(0),
    travelRequirementMin: z
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      }),
    travelRequirementMax: z
      .number()
      .min(1, {
        message: 'Weight must be at least 1.',
      })
      .max(100, {
        message: 'Weight must be at most 100.',
      }),
  })
  .refine(
    (data) => {
      if (
        data.squareFootageMax >= data.squareFootageMin &&
        data.travelRequirementMax >= data.travelRequirementMin
      ) {
        return true;
      }
      return false;
    },
    {
      message: 'Max must be greater than or equal to min.',
    }
  );

export const loginFormSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(4, {
        message: 'Email must be at least 4 characters long',
      })
      .max(85, {
        message: 'Email must be at most 85 characters long',
      }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(85, {
        message: 'Password must be at most 85 characters long',
      }),
  })
  .refine((data) => data.email && data.password, {
    message: 'Email and password are required',
    path: ['email', 'password'],
  });

export const registerFormSchema = z
  .object({
    email: z.string().email({
      message: 'You must enter a valid email.',
    }),
    password: z
      .string()
      .min(6, {
        message: `Your password isn't long enough.`,
      })
      .max(24, {
        message: `Your password is to long.`,
      }),
    passwordConfirmation: z
      .string()
      .min(6, {
        message: `Your password isn't long enough.`,
      })
      .max(24, {
        message: `Your password is to long.`,
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export const propertyFormSchema = z.object({
  propertyURL: z
    .string()
    .min(1, {
      message: 'Profile name must be at least 1 character.',
    })
    .max(100, {
      message: 'Profile name must be at most 100 character.',
    }),
  customVariable: z // Square Footage Input
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(10, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
});
