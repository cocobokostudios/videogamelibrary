import React from "react";
import { CommandBar, ICommandBarItemProps, Dialog, IDialogContentProps, DialogFooter, PrimaryButton, DefaultButton, IContextualMenuItemProps, TextField, Toggle, IconButton, on } from "@fluentui/react";

export interface ICollectionLoadDialogueProps {
    hidden: boolean;
    onLoadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onCancelClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    onFileInputChange(e: React.SyntheticEvent): void;
    onDismissClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const TESTIDS : any = {
    FILE_INPUT: "loadCollectionInput"
}

const CollectionLoadDialogue = ({ hidden, onCancelClick, onDismissClick, onLoadClick, onFileInputChange }: ICollectionLoadDialogueProps) => {
    const dialogProps: IDialogContentProps = {
        title: "Load Collection",
        showCloseButton: true,
        closeButtonAriaLabel: "Close"
    };

    return (
        <Dialog
            hidden={hidden}
            onDismiss={onDismissClick}
            dialogContentProps={dialogProps}>
                Select a file to load your collection.
                <input id="loadCollectionInput"
                    data-testid={TESTIDS.FILE_INPUT}
                    type="file"
                    accept="text/csv"
                    onChange={onFileInputChange} />
            <DialogFooter>
                <PrimaryButton onClick={onLoadClick} text="Load" />
                <DefaultButton onClick={onCancelClick} text="Cancel" />
            </DialogFooter>
        </Dialog>
    )
}
export default CollectionLoadDialogue;
