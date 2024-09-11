export type Comment = {
    id: number;
    created_at: string;
    body: string;
    user: User;
};

export enum EventTypeEnum {
    added_to_project = "added_to_project",
    assigned = "assigned",
    automatic_base_change_failed = "automatic_base_change_failed",
    automatic_base_change_succeeded = "automatic_base_change_succeeded",
    base_ref_changed = "base_ref_changed",
    closed = "closed",
    commented = "commented",
    committed = "committed",
    connected = "connected",
    convert_to_draft = "convert_to_draft",
    converted_note_to_issue = "converted_note_to_issue",
    converted_to_discussion = "converted_to_discussion",
    cross_referenced = "cross-referenced",
    demilestoned = "demilestoned",
    deployed = "deployed",
    deployment_environment_changed = "deployment_environment_changed",
    disconnected = "disconnected",
    head_ref_deleted = "head_ref_deleted",
    head_ref_restored = "head_ref_restored",
    head_ref_force_pushed = "head_ref_force_pushed",
    labeled = "labeled",
    locked = "locked",
    mentioned = "mentioned",
    marked_as_duplicate = "marked_as_duplicate",
    merged = "merged",
    milestoned = "milestoned",
    moved_columns_in_project = "moved_columns_in_project",
    pinned = "pinned",
    ready_for_review = "ready_for_review",
    referenced = "referenced",
    removed_from_project = "removed_from_project",
    renamed = "renamed",
    reopened = "reopened",
    review_dismissed = "review_dismissed",
    review_requested = "review_requested",
    review_request_removed = "review_request_removed",
    reviewed = "reviewed",
    subscribed = "subscribed",
    transferred = "transferred",
    unassigned = "unassigned",
    unlabeled = "unlabeled",
    unlocked = "unlocked",
    unmarked_as_duplicate = "unmarked_as_duplicate",
    unpinned = "unpinned",
    unsubscribed = "unsubscribed",
    user_blocked = "user_blocked",
}

export type Event = {
    id: number;
    actor: User;
    created_at: string;
    event: EventTypeEnum;
    label: {
        color: string;
        name: string;
    };
    url: string;
};

export type Issue = {
    id: number;
    body: string;
    comments_url: string;
    created_at: string;
    events_url: string;
    number: number;
    title: string;
    user: User;
};

export type User = {
    id: string;
    avatar_url: string;
    login: string;
    messageCount: number;
};
