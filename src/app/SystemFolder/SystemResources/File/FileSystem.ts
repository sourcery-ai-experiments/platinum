let defaultFSContent = {
    "Macintosh HD": {
        "_type": "drive",
        "_icon": `${process.env.NEXT_PUBLIC_BASE_PATH}/img/icons/disk.png`,
    }
}

export class PlatinumFileSystem {
    basePath: string;
    fs: object;
    separator: string;

    constructor(basePath: string = "", defaultFS: any = defaultFSContent, separator = ":") {
        this.basePath = basePath
        this.fs = typeof window !== 'undefined'
            ? JSON.parse(localStorage.getItem(this.basePath)) || defaultFS
            : defaultFS;
        this.separator = separator;
    }

    size(path: string) {
        return new Blob([this.readFileRaw(path)]).size;
    }

    pathArray(path: string) {
        return [this.basePath, ...path.split(this.separator)].filter((v) => v !== "");
    }

    resolve(path: string) {
        return this.pathArray(path).reduce((prev, curr) => prev?.[curr], this.fs)
    }

    readFile(path: string) {
        let item = this.resolve(path);
        if ('_data' in item && '_mimeType' in item) {
            return this.renderFile(item['_mimeType'], item['_data']);
        }
    }

    readFileRaw(path: string) {
        let item = this.resolve(path);
        if ('_data' in item) {
            return item['_data'];
        }
    }

    renderFile(mimeType: string, contents: any) {
        switch (mimeType) {
            default: {
                return contents;
            }
        }
    }

    ls(path: string) {
        let current = this.resolve(path);
        return Object.entries(current);
    }

    filterMetadata(content: any, mode: "only" | "remove" = "remove") {
        return Object.entries(content).filter(([a, _]) => {
            switch (mode) {
                case "only": {
                    if (a.startsWith("_")) return a
                    break;
                }
                default : {
                    if (!a.startsWith("_")) return a;
                    break;
                }
            }
        });
    }

    filterByType(path: string, byType: string | string[] = ["file", "directory"]) {
        if (typeof byType === "string") {
            return this.ls(path).filter(([_, b]) => b['_type'] === byType);
        }
        return this.ls(path).filter(([_, b]) => byType.includes(b['_type']));
    }

    statDir(path: string) {
        let current = this.resolve(path);
        let metaData = this.filterMetadata(current, "only");

        let name = path.split(":").slice(-1);

        let returnValue = {
            "_path": path,
            "_name": name[0],
            "_count": this.filterMetadata(this.resolve(path)).length
        }

        metaData.forEach((a) => {
            returnValue[a[0]] = a[1]
        })
        return returnValue
    }
}
