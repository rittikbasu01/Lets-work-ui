import { PipeTransform, Pipe } from "@angular/core";
import { RegisterUserModel } from "src/app/models/register-user.model";

@Pipe({
    name: 'AdminSearchFilter'
})
export class AdminSearchFilter implements PipeTransform {
    transform(admins: RegisterUserModel[], searchText: string): RegisterUserModel[] {
        if (!searchText)
            return admins;
        searchText = searchText.trim();
        return admins.filter(it => {
            return it.UserName
                .toLowerCase().includes(searchText.toLowerCase());
        });

    }
} 
