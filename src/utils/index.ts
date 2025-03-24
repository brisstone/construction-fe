export enum PageTypes {
  PROJECTS = "PROJECTS",
  CLIENTS = "CLIENTS",
  USERS = "USERS",
}

export enum sortOrder {
    ASC = "ASC",
    DESC = "DESC", 
  }


  // attendance
export enum PunctualityType {
  PRESENT = 'present',
  LATE = 'late',
  ABSENT = 'absent',
  EARLY = 'early',
  LEAVE = 'leave',
}

// LEAVE MANAGEMENT

export enum ApprovalStatus {
  VERIFIED = 'verified',
  PENDING = 'pending',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}


//  LEAVE TYPES
export enum LeaveTypes {
  SICK = 'sick',
  MATERNITY = 'maternity',
  PATERNITY = 'paternity',
  ANNUAL = 'annual',
  BEREAVEMENT = 'bereavement',
  STUDY = 'study',
  SABBATICAL = 'sabbatical',
  PUBLIC_HOLIDAY = 'public_holiday',
  PERSONAL = 'personal',
}

export enum UserRole {
  STAFF = 'staff',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum activeStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export const leaveOptionsFormatted = Object.values(LeaveTypes).map((type) => ({
  value: type,
  label: type.replace(/_/g, ' ').charAt(0).toUpperCase() + type.replace(/_/g, ' ').slice(1),
}));

export const getRandomLightColor = () => {
  const lightColors = [
    "#FCE7F3", "#E0F2FE", "#E8F5E9", "#FFF9C4", "#FFE0B2",
    "#EDE7F6", "#F3E5F5", "#FFEBEE", "#FBE9E7", "#FFF3E0"
  ];
  return lightColors[Math.floor(Math.random() * lightColors.length)];
};

export const getRandomDarkTextColor = () => {
  const darkColors = [
    "#1E293B", "#111827", "#334155", "#374151", "#4B5563"
  ];
  return darkColors[Math.floor(Math.random() * darkColors.length)];
};

export const activeStatusFormatted = Object.values(activeStatus).map((type) => ({
  value: type,
  label: type.replace(/_/g, ' ').charAt(0).toUpperCase() + type.replace(/_/g, ' ').slice(1),
}));



export const materialTypes = [
    "Cement",
    "Sand",
    "Gravel",
    "Blocks",
    "Bricks",
    "Steel Rods",
    "Structural Steel",
    "Aluminum",
    "Timber",
    "Plywood",
    "MDF Boards",
    "Tiles",
    "Paint",
    "Plaster",
    "Corrugated Sheets",
    "Roof Tiles",
    "Waterproof Membrane",
    "Wires",
    "Conduits",
    "Switches & Sockets",
    "PVC Pipes",
    "Fittings",
    "Water Tanks",
    "Glass",
    "Adhesives",
    "Insulation",
  ];