# Update Roles Connection in Admin Module

I have implemented the connection to update roles in the Admin module. This involves updates to the frontend to fetch available roles, display them in the admin form, and save the selected roles when updating an admin.

## Changes

### 1. Admin Routes and Gateway
- Added `updateAdminRoles` and `getAdminById` routes in `src/modules/admin/infrastructure/routes/index.ts`.
- Added `updateAdminRoles` and `getAdminById` methods in `src/modules/admin/infrastructure/gateways/admin.gateway.ts`.

### 2. Use Cases
- Created `AssignRoleToAdminUseCase` in `src/modules/admin/domain/useCases/assign-role-to-admin.useCase.ts`.
- Created `GetAdminByIdUseCase` in `src/modules/admin/domain/useCases/get-admin-by-id.useCase.ts`.
- Exported new use cases in `src/modules/admin/domain/useCases/index.ts`.

### 3. Interfaces
- Updated `IAdmin` interface in `src/modules/admin/infrastructure/interfaces/admin.interface.ts` to include `roles`.

### 4. Admin Form
- Updated `src/modules/admin/presentation/components/AdminForm.vue`:
    - Imported `GetRolesUseCase`, `AssignRoleToAdminUseCase`, and `GetAdminByIdUseCase`.
    - Added `roles` field to the form state.
    - Added `roleOptions` to store available roles.
    - Implemented `getRoles` to fetch roles on mount.
    - Implemented `handleGetAdmin` to fetch admin details (including roles) when in update mode.
    - Added a `q-select` component to allow selecting multiple roles.
    - Updated `handleUploadAdmin` to call `AssignRoleToAdminUseCase` when updating an admin.

## Verification
- The `AdminForm` now fetches roles when mounted.
- When editing an admin (`isUpdate` is true), it fetches the admin details and pre-fills the form, including selected roles.
- When submitting the form in update mode, it calls the `updateAdminRoles` endpoint with the selected role IDs.
