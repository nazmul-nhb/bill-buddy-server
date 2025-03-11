
import type { Document, Types } from 'mongoose';

export interface IMeal {
    // Define interface
    property: "Define types";
}

export interface IMealDoc extends IMeal, Document {
	_id: Types.ObjectId;
}
            