

export interface RepositoryPI<T> {

    add(objectToAdd: T);
    getAll();
    getById(objectToFetch: T);
    getByCompletionStatus(completedStatus: boolean);
    remove(objectToDelete: T);
    update(objectToChange: T);

}