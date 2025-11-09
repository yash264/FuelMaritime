export function toComplianceEntity(dto: any) {
    return {
      cb_before: dto.cb_before ?? 0,
      applied: dto.applied ?? 0,
      cb_after: dto.cb_after ?? 0,
    };
  }
  